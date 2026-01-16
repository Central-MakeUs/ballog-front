import type { ApiResponse } from '@/types/api/common'
import type { ApiResponseWithNoSuccess } from '@/types/api/common'
import type { TeamKey } from '@/shared/constants/teams'

export interface ChangeNicknameRequestDTO {
  baseballTeam: TeamKey
  nickname: string
}

export interface ChangeTeamRequestDTO {
  baseballTeam: TeamKey
}

export interface SignupRequestDTO {
  baseballTeam: TeamKey
  nickname: string
  termAgree: {
    privacyAgree: boolean
    serviceAgree: boolean
    marketingAgree: boolean
  }
}

export interface UserType {
  userId: number
  email: string
  nickname: string | null
  baseballTeam: TeamKey | null
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
