import { http, HttpResponse } from 'msw'

import { recording } from '@/mocks/data/recording'
import type { RecordingResponseDTO } from '@/entities/record/model/recording.type'
import type { ApiErrorMessage } from '@/types/api/common'

const MATCH_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/record/:matchId/match`

export const recordingHandlers = [
  http.get<
    { matchId: string },
    RecordingResponseDTO,
    ApiErrorMessage | RecordingResponseDTO
  >(`${MATCH_API_PREFIX}`, async ({ params }) => {
    const matchId = Number(params.matchId)

    const found = recording[matchId]

    await new Promise((res) => setTimeout(res, 1000)) // delay 1000ms

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
]
