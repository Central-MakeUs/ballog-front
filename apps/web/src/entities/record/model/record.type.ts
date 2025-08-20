import { type ApiResponse } from '@/types/api/common'
import { type TeamKey } from '@/shared/constants/teams'
import type { StadiumKey } from '@/shared/constants/stadium'

export type RecordResult = 'WIN' | 'LOSE' | 'DRAW' | null

export type EmotionType = 'POSITIVE' | 'NEGATIVE'

export interface Record {
  matchRecordId: number
  matchesId: number
  homeTeam: TeamKey
  awayTeam: TeamKey
  matchDate: string
  matchTime: string
  userId: number
  watchCnt: number
  result: RecordResult
  baseballTeam: TeamKey
}

export interface RecordResponse {
  totalCount: number
  winRate: number
  totalPositiveEmotionPercent: number
  totalNegativeEmotionPercent: number
  records: Record[]
}

export interface Image {
  imageUrl: string
  createdAt: string
}

export interface EmotionGroup {
  groupStart: string
  emotionType: EmotionType
  count: number
}

export interface RecordDetailResponse {
  matchRecordId: number
  matchesId: number
  homeTeam: TeamKey
  awayTeam: TeamKey
  matchDate: string
  matchTime: string
  stadium: StadiumKey
  userId: number
  watchCnt: number
  result: RecordResult
  baseballTeam: TeamKey
  positiveEmotionPercent: number
  negativeEmotionPercent: number
  defaultImageUrl: string | null
  imageList: Image[]
  emotionGroupList: EmotionGroup[]
}

export type RecordResponseDTO = ApiResponse<RecordResponse>
export type RecordDetailResponseDTO = ApiResponse<RecordDetailResponse>
export type RecordDeleteResponseDTO = ApiResponse<null>
