import { http, HttpResponse } from 'msw'

import { recording } from '@/mocks/data/recording'
import type {
  RecordingResponseDTO,
  RecordingPostResponseDTO,
} from '@/entities/record/model/recording.type'
import type { ApiErrorMessage } from '@/types/api/common'

type MatchResult = 'WIN' | 'LOSS' | 'DRAW' | 'SKIP'

const MATCH_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/record`

export const recordingHandlers = [
  http.get<
    { matchId: string },
    RecordingResponseDTO,
    ApiErrorMessage | RecordingResponseDTO
  >(`${MATCH_API_PREFIX}/:matchId/match`, async ({ params }) => {
    const matchId = Number(params.matchId)

    const found = recording[matchId]

    await new Promise((res) => setTimeout(res, 1000)) // delay 1000ms

    if (!found) {
      return HttpResponse.json(
        {
          error: 'fail',
          message: '해당 직관기록을 찾을 수 없습니다.',
          status: 408,
          code: 'RECORD001',
        },
        { status: 408 },
      )
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '기록 조회 성공',
        success: 'true',
        data: found,
      },
      { status: 200 },
    )
  }),
  http.patch<{ recordId: string }>(
    `${MATCH_API_PREFIX}/:recordId/result`,
    async ({ request }) => {
      const body = (await request.json()) as { result: MatchResult }

      const isValidResult = ['WIN', 'LOSS', 'DRAW', 'SKIP'].includes(
        body.result,
      )

      if (!isValidResult) {
        return HttpResponse.json(
          {
            message: '기록을 찾을 수 없습니다.',
            status: 404,
            success: false,
            data: {},
          },
          { status: 404 },
        )
      }

      return HttpResponse.json({
        message: '기록 결과 입력 성공',
        status: 200,
        success: true,
        data: {},
      })
    },
  ),

  http.post<
    never,
    { matchesId: number },
    ApiErrorMessage | RecordingPostResponseDTO
  >(MATCH_API_PREFIX, async ({ request }) => {
    const body = await request.json()
    const { matchesId } = body

    const found = recording[matchesId]

    await new Promise((res) => setTimeout(res, 500))

    const response: RecordingPostResponseDTO = {
      status: 200,
      message: '기록 생성 성공',
      success: 'true',
      data: found,
    }

    return HttpResponse.json(response, { status: 200 })
  }),
]
