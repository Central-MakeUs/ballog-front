import type { ApiResponse } from '@/types/api/common'

export interface FcmToken {
  token: string
}

export type FcmPostResponseDTO = ApiResponse<null>
