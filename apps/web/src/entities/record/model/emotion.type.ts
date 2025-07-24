import type { ApiResponse } from '@/types/api/common'
import type { TeamKey } from '@/shared/constants/teams'
import type { StadiumKey } from '@/shared/constants/stadium'

export interface EmotionType {
  matchesDate: string
  matchesTime: string
  homeTeam: TeamKey
  awayTeam: TeamKey
  stadium: StadiumKey
  positivePercent: number
  negativePercent: number
  recentEmotion: string | null
  defaultImageUrl: string
}

export type EmotionResponseDTO = ApiResponse<EmotionType>
