import { http, HttpResponse } from 'msw'
import type { MathResponseDTO } from '@/entities/match/model/match.type'
import type { ApiErrorMessage } from '@/types/api/common'
import { match } from '@/mocks/data/match'

const MATCH_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/match`

export const matchHandlers = [
  http.get<never, MathResponseDTO, ApiErrorMessage | MathResponseDTO>(
    `${MATCH_API_PREFIX}`,
    async () => {
      const matches = match.today.data

      const isEmpty = Math.random() < 0.5

      await new Promise((resolve) => setTimeout(resolve, match.today.delay))
      return HttpResponse.json(
        {
          data: isEmpty ? [] : matches,
          statusCode: 200,
          message: 'Success',
          success: '오늘 경기 일정 조회 성공',
        },
        { status: 200 },
      )
    },
  ),
]
