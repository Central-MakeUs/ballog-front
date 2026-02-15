import { api } from '@/shared/lib/ky'

import type {
  RecordDeleteResponseDTO,
  RecordDetailResponseDTO,
  RecordEmotionStatsResponseDTO,
  RecordResponseDTO,
} from '../model/record.type'

export const recordGet = {
  getRecord: async (): Promise<RecordResponseDTO> => {
    const response = await api.get('record').json<RecordResponseDTO>()
    return response
  },
  getRecordDetail: async (
    recordId: number,
  ): Promise<RecordDetailResponseDTO> => {
    const response = await api
      .get(`record/${recordId}`)
      .json<RecordDetailResponseDTO>()
    return response
  },
  getRecordEmotionStats: async (
    matchId: number,
  ): Promise<RecordEmotionStatsResponseDTO> => {
    const response = await api
      .get(`record/matches/${matchId}/team`)
      .json<RecordEmotionStatsResponseDTO>()
    return response
  },
}

export const recordDelete = {
  deleteRecord: async (recordId: number): Promise<RecordDeleteResponseDTO> => {
    const response = await api
      .delete(`record/${recordId}`)
      .json<RecordDeleteResponseDTO>()
    return response
  },
}
