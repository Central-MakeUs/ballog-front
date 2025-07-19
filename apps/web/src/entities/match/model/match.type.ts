import { type ApiResponse } from '@/types/api/common'
import { type TeamKey } from '@/shared/constants/teams'

export interface Match {
  matchesId: number
  matchesDate: string
  matchesTime: string
  homeTeam: TeamKey
  awayTeam: TeamKey
  stadium: string
  matchesResult: string | null
}

export type MacthResponseDTO = ApiResponse<Match[]>
