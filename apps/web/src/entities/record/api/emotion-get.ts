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
