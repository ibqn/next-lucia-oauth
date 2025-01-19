import { sha256 } from "@oslojs/crypto/sha2"
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding"
import { sessionTable, type Session, type User } from "./drizzle/schema/auth"
import { db } from "./drizzle/db"
import { eq } from "drizzle-orm"

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

export async function createSession(token: string, userId: number): Promise<Session> {
  const sessionToken = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const sessionData = {
    token: sessionToken,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  }
  const [session] = await db.insert(sessionTable).values(sessionData).returning()

  return session
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionToken = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))

  const sessionData = await db.query.session.findFirst({
    where: ({ token }, { eq }) => eq(token, sessionToken),
    with: {
      user: {
        columns: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          avatarUrl: true,
        },
      },
    },
  })

  if (!sessionData) {
    return { session: null, user: null }
  }

  const session: Session = {
    id: sessionData.id,
    token: sessionData.token,
    userId: sessionData.userId,
    expiresAt: sessionData.expiresAt,
    createdAt: sessionData.createdAt,
    updatedAt: sessionData.updatedAt,
  }
  const { user } = sessionData

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.token, session.token))
    return { session: null, user: null }
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await db.update(sessionTable).set({ expiresAt: session.expiresAt }).where(eq(sessionTable.token, session.token))
  }

  return { session, user }
}

export async function invalidateSessionToken(token: string): Promise<void> {
  const sessionToken = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  await db.delete(sessionTable).where(eq(sessionTable.token, sessionToken))
}

export type SessionValidationResult =
  | {
      session: Session
      user: User
    }
  | {
      session: null
      user: null
    }
