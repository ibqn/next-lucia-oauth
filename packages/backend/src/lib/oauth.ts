import { env } from "../env"
import { GitHub, Google } from "arctic"

export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET,
  "http://localhost:4000/auth/sign-in/github/callback"
)

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  "http://localhost:4000/auth/sign-in/google/callback"
)
