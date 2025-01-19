import { eq } from "drizzle-orm"
import { db } from "../drizzle/db"
import { userTable } from "../drizzle/schema/auth"

export const getUserById = async (id: number) => {
  const [user] = await db.select().from(userTable).where(eq(userTable.id, id))

  return user
}
