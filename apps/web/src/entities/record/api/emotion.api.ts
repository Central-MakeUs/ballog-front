import { api } from '@/shared/lib/ky'

import type { EmotionResponseDTO } from '@/entities/record/model/emotion.type'

export const emotionGet = {
  getEmotionRecord: async (matchRecordId: number): Promise<EmotionResponseDTO> => {
    const response = await api
      .get(`emotion/${matchRecordId}`)
      .json<EmotionResponseDTO>()
    return response
  },
}

export const emotionPost = {
  postEmotionRecord: async (
    matchRecordId: number,
    emotionType: string,
  ): Promise<EmotionResponseDTO> => {
    const response = await api
      .post('emotion', { json: { matchRecordId, emotionType } })
      .json<EmotionResponseDTO>()
    return response
  },
}
