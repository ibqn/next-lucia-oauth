import { sqliteTable, int, text, primaryKey, integer } from "drizzle-orm/sqlite-core"
import { createdAtUpdatedAt } from "./utils"
import { relations, type InferInsertModel } from "drizzle-orm"

export const userTable = sqliteTable("user", {
  id: int("id").primaryKey({ autoIncrement: true }),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  avatarUrl: text("avatar_url"),

  ...createdAtUpdatedAt,
})

export type User = InferInsertModel<typeof userTable>

export const sessionTable = sqliteTable("session", {
  id: int("id").primaryKey({ autoIncrement: true }),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  token: text("token").unique().notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),

  ...createdAtUpdatedAt,
})

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}))

export const accountTable = sqliteTable(
  "account",
  {
    userId: int("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    provider: text("provider", { enum: ["github", "google"] }).notNull(),
    providerAccountId: text("provider_account_id").notNull(),

    ...createdAtUpdatedAt,
  },
  (table) => {
    return [primaryKey({ name: "pk", columns: [table.provider, table.providerAccountId] })]
  }
)
