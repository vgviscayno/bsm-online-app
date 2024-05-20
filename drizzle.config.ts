import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config({ path: ".env.local" });

// const config = {
//   schema: "./src/db/schema/*",
//   out: "./drizzle",
//   driver: "pg",
//   dbCredentials: {
//     connectionString: process.env.NEON_DATABASE_URL!,
//   },
//   strict: true,
// }

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
  schema: "./src/db/schema/*",
  out: "./drizzle",
  strict: true,
});
