import { api } from '@/shared/lib/ky'

import type {
  RecordResponseDTO,
  RecordDetailResponseDTO,
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
}
