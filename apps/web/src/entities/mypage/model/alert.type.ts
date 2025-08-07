import type { ApiResponse } from '@/types/api/common'

export interface Alert {
  startAlert: boolean
  inGameAlert: boolean
}

export type AlertResponseDTO = ApiResponse<Alert>
