import type { Config } from "drizzle-kit"

export default {
  schema: "src/drizzle/schema",
  dialect: "sqlite",
  out: "src/drizzle/migrations",
  breakpoints: true,
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
