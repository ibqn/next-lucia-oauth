import { eq } from "drizzle-orm"
import { db } from "../drizzle/db"
import { userTable, type User } from "../drizzle/schema/auth"

export const getUserById = async (id: number) => {
  const [user] = await db.select().from(userTable).where(eq(userTable.id, id))

  return user
}

export const createUser = async (username: string, email: string, avatarUrl: string) => {
  const [user] = await db.insert(userTable).values({ username, email, avatarUrl }).returning().onConflictDoNothing()

  return user
}

export const getUserByUsername = async (username: string): Promise<User> => {
  const [user] = await db.select().from(userTable).where(eq(userTable.username, username))

  return user
}
