import { api } from '@/shared/lib/ky'
import type { EmotionResponseDTO } from '@/entities/record/model/emotion.type'

export const emotionPost = {
  postEmotionRecord: async (
    matchRecordId: number,
    emotionType: string,
  ): Promise<EmotionResponseDTO> => {
    const response = await api
      .post(`emotion/new`, { json: { matchRecordId, emotionType } })
      .json<EmotionResponseDTO>()
    return response
  },
}
