import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import pg from "pg";

dotenv.config({ path: ".env.local" });
const { Pool } = pg;
const { DATABASE_URL, DATABASE_SSL, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!DATABASE_URL || !ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error("DATABASE_URL, ADMIN_EMAIL, and ADMIN_PASSWORD must be set in .env.local.");

const pool = new Pool({ connectionString: DATABASE_URL, ssl: DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined });
const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
const result = await pool.query("update admins set password_hash = $1 where email = $2", [passwordHash, ADMIN_EMAIL.trim().toLowerCase()]);
await pool.end();
if (result.rowCount !== 1) throw new Error("No administrator exists for ADMIN_EMAIL. Start the server once to create it first.");
console.log("Administrator password updated.");
