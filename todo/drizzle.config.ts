import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schems.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;
