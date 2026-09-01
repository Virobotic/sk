import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import pg from "pg";

dotenv.config({ path: ".env.local" });

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";
const databaseUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;
const contactRecipient = process.env.CONTACT_RECIPIENT_EMAIL || process.env.ADMIN_EMAIL;
const contactFrom = process.env.CONTACT_FROM_EMAIL;

if (!databaseUrl || !jwtSecret) throw new Error("DATABASE_URL and JWT_SECRET must be set.");
const pool = new Pool({ connectionString: databaseUrl, ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined });

async function prepareDatabase() {
  await pool.query(`
    create table if not exists admins (
      id serial primary key,
      email text unique not null,
      password_hash text not null,
      created_at timestamptz not null default now()
    );
    create table if not exists site_content (
      id smallint primary key check (id = 1),
      content jsonb not null default '{}'::jsonb,
      updated_at timestamptz not null default now()
    );
    insert into site_content (id) values (1) on conflict (id) do nothing;
  `);
  const { rows: [{ count }] } = await pool.query("select count(*)::int as count from admins");
  if (count === 0 && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await pool.query("insert into admins (email, password_hash) values ($1, $2)", [process.env.ADMIN_EMAIL.toLowerCase(), passwordHash]);
    console.log("Initial administrator account created.");
  }
}

function authenticate(request, response, next) {
  try {
    request.admin = jwt.verify(request.cookies.admin_token, jwtSecret);
    next();
  } catch { response.status(401).json({ error: "Authentication required." }); }
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.post("/api/contact", async (request, response) => {
  const name = String(request.body.name || "").trim();
  const email = String(request.body.email || "").trim();
  const message = String(request.body.message || "").trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !emailPattern.test(email) || !message) return response.status(400).json({ error: "Please provide your name, a valid email address, and a message." });
  if (name.length > 120 || email.length > 254 || message.length > 5000) return response.status(400).json({ error: "Your message is too long." });
  if (!resendApiKey || !contactRecipient || !contactFrom) return response.status(503).json({ error: "The contact form email service has not been configured yet." });
  try {
    const resendResponse = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: contactFrom, to: [contactRecipient], reply_to: email, subject: `Website contact from ${name}`, text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}` }) });
    if (!resendResponse.ok) { console.error("Contact email failed:", await resendResponse.text()); return response.status(502).json({ error: "Unable to send your message right now. Please try again later." }); }
    response.status(201).json({ message: "Your message has been sent." });
  } catch (error) { console.error("Contact email failed:", error); response.status(502).json({ error: "Unable to send your message right now. Please try again later." }); }
});

app.post("/api/auth/login", async (request, response) => {
  const email = String(request.body.email || "").trim().toLowerCase();
  const password = String(request.body.password || "");
  const { rows } = await pool.query("select id, email, password_hash from admins where email = $1", [email]);
  const admin = rows[0];
  if (!admin || !await bcrypt.compare(password, admin.password_hash)) return response.status(401).json({ error: "Invalid email or password." });
  const token = jwt.sign({ id: admin.id, email: admin.email }, jwtSecret, { expiresIn: "8h" });
  response.cookie("admin_token", token, { httpOnly: true, sameSite: "lax", secure: isProduction, maxAge: 8 * 60 * 60 * 1000 });
  response.json({ admin: { email: admin.email } });
});
app.post("/api/auth/logout", (_request, response) => { response.clearCookie("admin_token", { httpOnly: true, sameSite: "lax", secure: isProduction }); response.status(204).end(); });
app.get("/api/auth/me", authenticate, (request, response) => response.json({ admin: { email: request.admin.email } }));

app.get("/api/content", async (_request, response) => {
  const { rows } = await pool.query("select content, updated_at from site_content where id = 1");
  response.json(rows[0] || { content: {} });
});
app.put("/api/content", authenticate, async (request, response) => {
  if (!request.body.content || typeof request.body.content !== "object" || Array.isArray(request.body.content)) return response.status(400).json({ error: "A content object is required." });
  const { rows } = await pool.query("update site_content set content = $1, updated_at = now() where id = 1 returning content, updated_at", [request.body.content]);
  response.json(rows[0]);
});

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(here, "..");
const uploadsDir = path.join(projectRoot, "uploads");
const dist = path.join(projectRoot, "dist");

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir));

app.post("/api/upload", authenticate, async (request, response) => {
  try {
    const file = request.body?.file;
    const fileName = request.body?.fileName;
    if (!file || typeof file !== "string" || !fileName || typeof fileName !== "string") {
      return response.status(400).json({ error: "No image file was provided." });
    }

    const matches = file.match(/^data:image\/(png|jpeg|jpg|gif|webp);base64,(.+)$/i);
    if (!matches) return response.status(400).json({ error: "Unsupported image format." });

    const ext = matches[1].toLowerCase();
    const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
    const safeName = `${Date.now()}-${cleanName || `upload.${ext}`}`;
    const fullPath = path.join(uploadsDir, safeName);
    const buffer = Buffer.from(matches[2], "base64");

    fs.writeFileSync(fullPath, buffer);
    response.status(201).json({ url: `/uploads/${safeName}` });
  } catch (error) {
    console.error("Upload failed:", error);
    response.status(500).json({ error: "Image upload failed." });
  }
});

if (isProduction) { app.use(express.static(dist)); app.get("/{*splat}", (_request, response) => response.sendFile(path.join(dist, "index.html"))); }

prepareDatabase().then(() => app.listen(port, () => console.log(`Server listening on port ${port}`))).catch((error) => { console.error("Database setup failed:", error); process.exit(1); });
