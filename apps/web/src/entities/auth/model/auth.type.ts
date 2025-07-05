import { type ApiResponse } from '../../../types/api/common'

export interface SignupRequestDTO {
  baseballTeam: string
  nickname: string
}

export type SignupResponseDTO = ApiResponse<string>
