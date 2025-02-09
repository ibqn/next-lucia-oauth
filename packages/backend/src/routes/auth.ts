import { generateState, OAuth2Tokens } from "arctic"
import { Hono } from "hono"
import { github } from "../lib/oauth"
import { getCookie, setCookie } from "hono/cookie"
import { createUser, getUserById, getUserByUsername } from "database/src/queries/user"
import type { SuccessResponse } from "../types"
import type { User } from "database/src/drizzle/schema/auth"
import { createAccount } from "database/src/queries/account"
import { createSession, generateSessionToken } from "database/src/lucia"

export const authRoute = new Hono()

authRoute
  .get("/sign-in/github", async (c) => {
    const state = generateState()
    const scopes = ["user:email"]

    const url = github.createAuthorizationURL(state, scopes)

    setCookie(c, "github_oauth_state", state, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    })

    return c.redirect(url.toString(), 302)
  })
  .get("/sign-in/github/callback", async (c) => {
    const { code, state } = c.req.query()

    console.log("code", code, "state", state)
    const storedState = getCookie(c, "github_oauth_state") ?? null
    if (code === null || state === null || storedState === null) {
      return c.body(null, { status: 400 })
    }
    if (state !== storedState) {
      return c.body(null, { status: 400 })
    }

    let tokens: OAuth2Tokens
    try {
      tokens = await github.validateAuthorizationCode(code)
    } catch (error) {
      console.error(error)
      // Invalid code or client credentials
      return c.body(null, { status: 400 })
    }
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${tokens.accessToken()}` },
    })
    const githubUser = await githubUserResponse.json()

    console.log("github user", githubUser)

    const emailListRequest = new Request("https://api.github.com/user/emails")
    emailListRequest.headers.set("Authorization", `Bearer ${tokens.accessToken()}`)
    const emailListResponse = await fetch(emailListRequest)
    const emailListResult = await emailListResponse.json()
    console.log("email list", emailListResult)

    const username = githubUser.login
    const { email } = emailListResult.find((emailItem: any) => emailItem.primary && emailItem.verified)
    const avatarUrl = githubUser.avatar_url

    await createUser(username, email, avatarUrl)
    const user = await getUserByUsername(username)

    const providerAccountId = githubUser.id.toString()

    await createAccount(user.id, "github", providerAccountId)

    const token = generateSessionToken()
    const session = await createSession(token, user.id)

    setCookie(c, "lucia_session", token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: session.expiresAt,
      sameSite: "lax",
    })

    return c.redirect("http://localhost:3000/", 302)
  })
  .get("/user", async (c) => {
    const user = await getUserById(1)
    return c.json<SuccessResponse<User>>({ message: "User found", data: user, success: true })
  })
