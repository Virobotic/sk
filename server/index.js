import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

dotenv.config({ path: ".env.local" });

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";
const databaseUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;

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

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

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
const dist = path.join(here, "..", "dist");
if (isProduction) { app.use(express.static(dist)); app.get("/{*splat}", (_request, response) => response.sendFile(path.join(dist, "index.html"))); }

prepareDatabase().then(() => app.listen(port, () => console.log(`Server listening on port ${port}`))).catch((error) => { console.error("Database setup failed:", error); process.exit(1); });
