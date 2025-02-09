import { db } from "../drizzle/db"
import { accountTable } from "../drizzle/schema/auth"

export const createAccount = async (userId: number, provider: "github" | "google", providerAccountId: string) => {
  const [account] = await db
    .insert(accountTable)
    .values({ userId, provider, providerAccountId })
    .returning()
    .onConflictDoNothing()

  return account
}
