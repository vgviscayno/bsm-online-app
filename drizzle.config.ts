import dotenv from "dotenv";
import type { Config } from "drizzle-kit";
dotenv.config({ path: ".env.local" });

export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.NEON_DATABASE_URL!,
  },
  strict: true,
} satisfies Config;
