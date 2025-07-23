import { api } from '@/shared/lib/ky'
import type { EmotionResponseDTO } from '@/entities/record/model/emotion.type'

export const emotionGet = {
  getEmotionRecord: async (recordId: number): Promise<EmotionResponseDTO> => {
    const response = await api
      .get(`emotion/${recordId}`)
      .json<EmotionResponseDTO>()
    return response
  },
}
