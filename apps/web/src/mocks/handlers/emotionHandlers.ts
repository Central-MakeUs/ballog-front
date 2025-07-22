import { http, HttpResponse } from 'msw'

import type { EmotionResponseDTO } from '@/entities/record/model/emotion.type'
import {
  emotionGet,
  emotionPostPositive,
  emotionPostNegative,
} from '@/mocks/data/emotion'

const EMOTION_API_PREFIX = 'http://localhost:5173/api/v1/emotion'

const getEmotionHandler = http.get(
  `${EMOTION_API_PREFIX}/:recordId`,
  ({ params }) => {
    const { recordId } = params

    // recordId 별로 다르게 하려면 조건문 분기 가능
    return HttpResponse.json<EmotionResponseDTO>({
      message: 'success',
      statusCode: 200,
      success: '감정 비율 조회 성공',
      data: emotionGet.data,
    })
  },
)

const postEmotionHandler = http.post(
  `${EMOTION_API_PREFIX}`,
  async ({ request }) => {
    const body = (await request.json()) as {
      recordId: number
      emotionType: 'POSITIVE' | 'NEGATIVE'
    }
    const { emotionType } = body

    const responseData =
      emotionType === 'POSITIVE'
        ? emotionPostPositive.data
        : emotionPostNegative.data

    return HttpResponse.json<EmotionResponseDTO>({
      message: 'success',
      statusCode: 200,
      success: '감정 표현 등록 성공',
      data: responseData,
    })
  },
)

export const emotionHandlers = [getEmotionHandler, postEmotionHandler]
