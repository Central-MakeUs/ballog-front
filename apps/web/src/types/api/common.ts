import type { HTTPError } from 'ky'

export interface ApiResponse<T> {
  data: T
  status: number
  message: string
  success: string
}

export interface ApiResponseWithNoSuccess<T> {
  data: T
  status: number
  message: string
}

export interface ApiErrorMessage {
  error: string
  message: string
  status: number
  code: string
}

// ky 커스텀 에러 타입
export type KyHttpError = HTTPError<ApiErrorMessage>

// client에서 사용할 에러 타입
export type ExtendedKyHttpError = KyHttpError & {
  errorData: ApiErrorMessage
}
