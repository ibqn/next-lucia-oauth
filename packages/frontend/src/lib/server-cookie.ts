import { sessionCookieName } from "database/src/cookie"

export const getCookieServer = async () => {
  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(sessionCookieName)?.value
  if (cookieValue) {
    return `${sessionCookieName}=${cookieValue}`
  }
  return null
}
