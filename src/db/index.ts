import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const connectionString = process.env.NEON_DATABASE_URL as string;

const sql = neon(connectionString);

export const db = drizzle(sql);
