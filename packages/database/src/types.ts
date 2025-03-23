export type ErrorResponse = {
  success: false
  error: string
}

export type SuccessResponse<T = void> = {
  success: true
  message: string
} & (T extends void ? {} : { data: T })

export type ApiResponse<T = void> = SuccessResponse<T> | ErrorResponse
