import { type ApiResponse } from '../../../types/api/common'

export interface SignupRequestDTO {
  baseballTeam: string
  nickname: string
}

interface MyPageResponse {
  userId: number
  email: string
  nickname: string
  baseballTeam: string
  isNewUser: boolean
  role: 'USER' | 'ADMIN'
}

export type SignupResponseDTO = ApiResponse<string>
export type MyPageResponseDTO = ApiResponse<MyPageResponse>