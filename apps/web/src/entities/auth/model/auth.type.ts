import type { ApiResponse } from '@/types/api/common'
import type { ApiResponseWithNoSuccess } from '@/types/api/common'

export interface SignupRequestDTO {
  baseballTeam: string
  nickname: string
}

export interface MeType {
  userId: number
  email: string
  nickname: string
  baseballTeam: string
  isNewUser: boolean
  role: 'USER' | 'ADMIN'
}

export type SignupResponseDTO = ApiResponse<string>
export type MeResponseDTO = ApiResponseWithNoSuccess<MeType>
