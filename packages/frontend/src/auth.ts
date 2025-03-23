"use server"

import { axios } from "@/api/axios"
import type { SessionValidationResult } from "database/src/lucia"
import type { SuccessResponse } from "database/src/types"

export const validateRequest = async (): Promise<SessionValidationResult> => {
  try {
    const { data: validationSession } = await axios.get<SuccessResponse<SessionValidationResult>>(`/auth/validate`)

    return validationSession.data
  } catch (error) {
    console.error(error)
    return { user: null, session: null }
  }
}
