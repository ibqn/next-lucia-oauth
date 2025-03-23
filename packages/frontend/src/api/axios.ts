import { env } from "@/env"
import { getCookieServer } from "@/lib/server-cookie"
import axiosNative from "axios"

const defaultOptions = {
  baseURL: `${env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
}

const axios = axiosNative.create(defaultOptions)

const isServer = typeof window === "undefined"

if (isServer) {
  axios.interceptors.request.use(
    async (config) => {
      const serverSessionCookie = await getCookieServer()

      if (serverSessionCookie) {
        config.headers["Cookie"] = serverSessionCookie
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export { axios }
