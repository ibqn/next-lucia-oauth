import { db } from "./drizzle/db"

const result = db.run("select 1")
console.log(result)
