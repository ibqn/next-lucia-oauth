import { eq } from "drizzle-orm"
import { db } from "./drizzle/db"
import { userTable, type User } from "./drizzle/schema/auth"

const seed = async () => {
  const users: User[] = [
    {
      username: "alice",
      email: "elice@gmail.com",
    },
    {
      username: "bob",
      email: "bob@gmail.com",
    },
  ]

  const seededUsers = await db.insert(userTable).values(users).returning().onConflictDoNothing()

  console.log(seededUsers)

  const updateResult = await db
    .update(userTable)
    .set({ username: "bia" })
    .where(eq(userTable.id, 2))
    .returning({ id: userTable.id })

  const start = Date.now()
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const end = Date.now()
  console.log(`Time taken" ${(end - start) / 1000}s`)
}

seed().then(() => {
  console.log("Seed complete")
  process.exit(0)
})
