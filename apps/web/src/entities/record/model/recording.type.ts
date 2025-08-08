import type { ApiResponse } from '@/types/api/common'
import type { TeamKey } from '@/shared/constants/teams'
import type { StadiumKey } from '@/shared/constants/stadium'

export type RecordResult = 'WIN' | 'LOSE' | 'DRAW' | null

export interface RecordingResponse {
  matchRecordId: number
  matchesId: number
  stadium: StadiumKey
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
  result: 'WIN' | 'LOSS' | 'DRAW' | null
  baseballTeam: TeamKey
  positiveEmotionPercent: number
  negativeEmotionPercent: number
  defaultImageUrl: string
  imageList: Image[]
  emotionGroupList: EmotionGroup[]
}

interface Image {
  imageUrl: string
  createdAt: string
}

interface EmotionGroup {
  groupStart: string
  emotionType: string
  count: number
}

export interface RecordingPostResponse {
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
  baseballTeam: TeamKey
  positiveEmotionPercent: number
  negativeEmotionPercent: number
  defaultImageUrl: string
}

export type RecordingResponseDTO = ApiResponse<RecordingResponse>
export type RecordingPatchResponseDTO = ApiResponse<Record<string, never>>
export type RecordingPostResponseDTO = ApiResponse<RecordingPostResponse>
