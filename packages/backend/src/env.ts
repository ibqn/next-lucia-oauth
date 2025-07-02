import { z } from "zod/v4"

const envSchema = z.object({
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),

  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),

  DATABASE_URL: z.url(),
})

const result = envSchema.safeParse(process.env)

if (result.error) {
  console.error("❌ Invalid env:")
  console.error(JSON.stringify(z.flattenError(result.error).fieldErrors, null, 2))
  process.exit(1)
}

export const env = result.data
