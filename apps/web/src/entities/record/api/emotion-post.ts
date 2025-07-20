import { api } from '@/shared/lib/ky'
import type { EmotionResponseDTO } from '@/entities/record/model/emotion.type'

export const emotionPost = {
  postEmotionRecord: async (): Promise<EmotionResponseDTO> => {
    const response = await api.post('emotion').json<EmotionResponseDTO>()
    return response
  },
}
