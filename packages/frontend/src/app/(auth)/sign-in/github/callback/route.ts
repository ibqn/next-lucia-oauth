import { github } from "@/lib/oauth"
import { cookies } from "next/headers"
import type { OAuth2Tokens } from "arctic"
import { createUser } from "@/action/user"

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const cookieStore = await cookies()
  const storedState = cookieStore.get("github_oauth_state")?.value ?? null
  if (code === null || state === null || storedState === null) {
    return new Response(null, { status: 400 })
  }
  if (state !== storedState) {
    return new Response(null, { status: 400 })
  }

  let tokens: OAuth2Tokens
  try {
    tokens = await github.validateAuthorizationCode(code)
  } catch (error) {
    console.error(error)
    // Invalid code or client credentials
    return new Response(null, { status: 400 })
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
  //   const githubUserId = githubUser.id
  //   const githubUsername = githubUser.login

  //   // TODO: Replace this with your own DB query.
  //   const existingUser = await getUserFromGitHubId(githubUserId)

  //   if (existingUser !== null) {
  //     const sessionToken = generateSessionToken()
  //     const session = await createSession(sessionToken, existingUser.id)
  //     await setSessionTokenCookie(sessionToken, session.expiresAt)
  //     return new Response(null, {
  //       status: 302,
  //       headers: {
  //         Location: '/',
  //       },
  //     })
  //   }

  // //   // TODO: Replace this with your own DB query.
  // //   const user = await createUser(githubUserId, githubUsername)

  //   const sessionToken = generateSessionToken()
  //   const session = await createSession(sessionToken, user.id)
  //   await setSessionTokenCookie(sessionToken, session.expiresAt)

  const username = githubUser.login
  const { email } = emailListResult.filter((emailItem: any) => emailItem.primary && emailItem.verified)
  const avatarUrl = githubUser.avatar_url

  await createUser(username, email, avatarUrl)

  return new Response(null, { status: 302, headers: { Location: "/" } })
}
