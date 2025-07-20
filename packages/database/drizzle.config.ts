import type { Config } from "drizzle-kit"
import { env } from "./src/env"

export default {
  schema: "src/drizzle/schema",
  dialect: "sqlite",
  out: "src/drizzle/migrations",
  breakpoints: true,
  verbose: true,
  strict: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config
