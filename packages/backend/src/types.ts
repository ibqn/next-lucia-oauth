export type ErrorResponse = {
  success: false
  error: string
}

export type SuccessResponse<T = void> = {
  success: true
  message: string
} & (T extends void ? {} : { data: T })
