export interface ApiResponse<T> {
  data: T
  statusCode: number
  message: string
}

export interface ApiError {
  code: string
  message: string
}
