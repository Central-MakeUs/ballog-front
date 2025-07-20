import { http, HttpResponse } from 'msw'
import type { EmotionResponseDTO } from '@/entities/record/model/emotion.type'
import type { ApiErrorMessage } from '@/types/api/common'
import { emotion } from '@/mocks/data/emotion'

const EMOTION_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_UR}/api/v1/emotion`

export const emotionHandlers = [
  http.post<never, EmotionResponseDTO, ApiErrorMessage | EmotionResponseDTO>(
    EMOTION_API_PREFIX,
    async () => {
      const responseData = emotion.data

      // mock latency (선택)
      await new Promise((resolve) =>
        setTimeout(resolve, emotion.delay || 500),
      )

      return HttpResponse.json(
        {
          data: responseData,
          statusCode: 200,
          message: 'success',
          success: '감정 표현 등록 성공',
        },
        { status: 200 },
      )
    },
  ),
]
