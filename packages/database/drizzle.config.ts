import type { Config } from "drizzle-kit"
import { processEnv } from "./src/env"

export default {
  schema: "src/drizzle/schema",
  dialect: "sqlite",
  out: "src/drizzle/migrations",
  breakpoints: true,
  verbose: true,
  strict: true,
  dbCredentials: {
    url: processEnv.DATABASE_URL,
  },
} satisfies Config
