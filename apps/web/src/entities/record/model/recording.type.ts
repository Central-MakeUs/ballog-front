import type { ApiResponse } from '@/types/api/common'
import type { TeamKey } from '@/shared/constants/teams'

export type RecordResult = 'WIN' | 'LOSE' | 'DRAW' | null

export interface RecordingResponseDTO {
  matchRecordId: number
  matchesId: number
  homeTeam: TeamKey
  awayTeam: TeamKey
  matchDate: string
  matchTime: {
    hour: number
    minute: number
    second: number
    nano: number
  }
  userId: number
  watchCnt: number
  result: 'WIN' | 'LOSS' | 'DRAW'
  baseballTeam: TeamKey
  positiveEmotionPercent: number
  negativeEmotionPercent: number
  defaultImageUrl: string
}

export type RecordingPatchResponseDTO = ApiResponse<Record<string, never>>
