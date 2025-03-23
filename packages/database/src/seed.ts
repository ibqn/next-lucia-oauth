import { eq } from "drizzle-orm"
import { db } from "./drizzle/db"
import { userTable } from "./drizzle/schema/auth"

const seed = async () => {
  const users = [
    {
      username: "alice",
      email: "elice@gmail.com",
    },
    {
      username: "bob",
      email: "bob@gmail.com",
    },
  ]

  const start = Date.now()

  const seededUsers = await db.insert(userTable).values(users).returning().onConflictDoNothing()

  console.log(seededUsers)

  const updateResult = await db
    .update(userTable)
    .set({ username: "bia" })
    .where(eq(userTable.id, 2))
    .returning({ id: userTable.id })

  const end = Date.now()
  console.log(`Time taken" ${(end - start) / 1000}s`)
}

seed().then(() => {
  console.log("Seed complete")
  process.exit(0)
})
