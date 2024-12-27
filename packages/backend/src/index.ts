import { serve } from "@hono/node-server"
import { Hono } from "hono"
import type { ErrorResponse, SuccessResponse } from "./types"

const app = new Hono()

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

app.get("test", (c) => {
  return c.json<SuccessResponse<{ test: string }>>({ success: true, message: "test dada", data: { test: "test" } })
})

app.get("error", (c) => {
  return c.json<ErrorResponse>({ success: false, error: "An error occurred" })
})

const port = 4000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
