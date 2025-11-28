import { http, HttpResponse } from 'msw'

import type {
  MacthResponseDTO,
  MatchByDateResponseDTO,
} from '@/entities/match/model/match.type'
import type { ApiErrorMessage } from '@/types/api/common'
import { match, matchByDate } from '@/mocks/data/match'

const MATCH_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/match`

export const matchHandlers = [
  http.get<never, MacthResponseDTO, ApiErrorMessage | MacthResponseDTO>(
    `${MATCH_API_PREFIX}`,
    async () => {
      const matches = match.today.data

      const isEmpty = Math.random() < 0.1

      await new Promise((resolve) => setTimeout(resolve, match.today.delay))
      return HttpResponse.json(
        {
          data: isEmpty ? [] : matches,
          status: 200,
          message: 'Success',
          success: '오늘 경기 일정 조회 성공',
        },
        { status: 200 },
      )
    },
  ),

  http.get<
    never,
    MatchByDateResponseDTO,
    ApiErrorMessage | MatchByDateResponseDTO
  >(`${MATCH_API_PREFIX}/date`, async ({ request }) => {
    const url = new URL(request.url)
    const date = url.searchParams.get('matches_date')

    // 목데이터 매칭
    const matches = date ? (matchByDate.data[date] ?? []) : []

    await new Promise((resolve) => setTimeout(resolve, matchByDate.delay))

    return HttpResponse.json(
      {
        message: 'success',
        status: 200,
        success: '특정 날짜 경기 조회 성공(캘린더)',
        data: {
          [date ?? '']: matches,
        },
      },
      { status: 200 },
    )
  }),

  http.get<
    never,
    MatchByDateResponseDTO,
    ApiErrorMessage | MatchByDateResponseDTO
  >(`${MATCH_API_PREFIX}/all`, async () => {
    // 목데이터 전체
    const allMatches = matchByDate.data

    await new Promise((resolve) => setTimeout(resolve, matchByDate.delay))

    return HttpResponse.json(
      {
        message: 'success',
        status: 200,
        success: '전체 경기 일정 조회 성공',
        data: allMatches,
      },
      { status: 200 },
    )
  }),
]
