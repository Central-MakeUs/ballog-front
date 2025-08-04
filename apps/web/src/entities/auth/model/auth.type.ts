import type { ApiResponse } from '@/types/api/common'
import type { ApiResponseWithNoSuccess } from '@/types/api/common'

export interface SignupRequestDTO {
  baseballTeam: string
  nickname: string
}

export interface UserType {
  userId: number
  email: string
  nickname: string
  baseballTeam: string
  isNewUser: boolean
  role: 'USER' | 'ADMIN'
}

export interface SocialLoginResponse {
  accessToken: string
  refreshToken: string
}

export interface AppleLoginResponse {
  authorizationCode: string
}

export type SignupResponseDTO = ApiResponse<string>
export type LogoutResponseDTO = ApiResponse<string>
export type WithDrawResponseDTO = ApiResponse<string>
export type UserResponseDTO = ApiResponseWithNoSuccess<UserType>
export type SocialLoginResponseDTO = ApiResponse<SocialLoginResponse>
export type AppleLoginResponseDTO = ApiResponse<AppleLoginResponse>
