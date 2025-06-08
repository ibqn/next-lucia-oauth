import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import { accountTable, sessionRelations, sessionTable, userTable } from "./schema/auth"
import { processEnv } from "../env"

const client = createClient({ url: processEnv.DATABASE_URL })
export const db = drizzle(client, {
  schema: {
    user: userTable,
    session: sessionTable,
    sessionRelations,
    account: accountTable,
  },
})
