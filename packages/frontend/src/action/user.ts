"use server"

import { createUser as createUserDb } from "database/src/queries/user"

export const createUser = async (username: string, email: string, avatarUrl: string) => {
  return createUserDb(username, email, avatarUrl)
}
