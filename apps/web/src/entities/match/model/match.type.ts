import { type ApiResponse } from '@/types/api/common'
import { type TeamKey } from '@/shared/constants/teams'
import type { StadiumKey } from '@/shared/constants/stadium'

export interface Match {
  matchesId: number
  matchesDate: string
  matchesTime: string
  homeTeam: TeamKey
  awayTeam: TeamKey
  stadium: StadiumKey
  matchesResult: string | null
}

export type MacthResponseDTO = ApiResponse<Match[]>
