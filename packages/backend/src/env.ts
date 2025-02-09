import { z } from "zod"

const envSchema = z.object({
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),

  DATABASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
