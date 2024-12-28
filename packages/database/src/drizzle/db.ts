import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import { z } from "zod"
import { sessionRelations, sessionTable, userTable } from "./schema/auth"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
})

const processEnv = envSchema.parse(process.env)

const client = createClient({ url: processEnv.DATABASE_URL })
export const db = drizzle(client, {
  schema: {
    users: userTable,
    sessions: sessionTable,
    sessionRelations,
  },
})
