import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import config from "@/lib/config";

if (!config.env.databaseUrl) {
  throw new Error("Database URL is not defined in environment variables.");
}

const sql = neon(config.env.databaseUrl);

export const db = drizzle({ client: sql });
