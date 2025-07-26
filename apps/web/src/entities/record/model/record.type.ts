import { type ApiResponse } from '@/types/api/common'
import { type TeamKey } from '@/shared/constants/teams'

export type RecordResult = 'WIN' | 'LOSE' | 'DRAW' | null

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
  positiveEmotionPercent: number
  negativeEmotionPercent: number
  records: Record[]
}

export interface Image {
  imageUrl: string
  createdAt: string
}

export interface RecordDetailResponse {
  matchRecordId: number
  matchesId: number
  homeTeam: TeamKey
  awayTeam: TeamKey
  matchDate: string
  matchTime: string
  stadium: string
  userId: number
  watchCnt: number
  result: RecordResult
  baseballTeam: TeamKey
  positiveEmotionPercent: number
  negativeEmotionPercent: number
  defaultImageUrl: string | null
  imageList: Image[]
}

export type RecordResponseDTO = ApiResponse<RecordResponse>
export type RecordDetailResponseDTO = ApiResponse<RecordDetailResponse>
