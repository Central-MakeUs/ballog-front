import { http, HttpResponse, delay } from 'msw'

import type {
  RecordResponseDTO,
  RecordDetailResponseDTO,
} from '@/entities/record/model/record.type'
import type { ApiErrorMessage } from '@/types/api/common'
import { record } from '@/mocks/data/record'

const RECORD_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/record`

export const recordHandlers = [
  http.get<never, RecordResponseDTO, ApiErrorMessage | RecordResponseDTO>(
    `${RECORD_API_PREFIX}`,
    () => {
      // 네트워크 지연 효과 추가
      delay(3000)

      const isEmpty = Math.random() > 0.5

      if (isEmpty) {
        return HttpResponse.json<RecordResponseDTO>({
          data: {
            totalCount: 0,
            winRate: 0,
            positiveEmotionPercent: 0,
            negativeEmotionPercent: 0,
            records: [],
          },
          statusCode: 200,
          message: 'Success',
          success: '오늘 경기 일정 조회 성공',
        })
      }

      return HttpResponse.json<RecordResponseDTO>(
        {
          data: {
            totalCount: 1,
            winRate: 0,
            positiveEmotionPercent: 50,
            negativeEmotionPercent: 50,
            records: record.records,
          },
          statusCode: 200,
          message: 'Success',
          success: '오늘 경기 일정 조회 성공',
        },
        { status: 200 },
      )
    },
  ),
  http.get<
    never,
    RecordDetailResponseDTO,
    ApiErrorMessage | RecordDetailResponseDTO
  >(`${RECORD_API_PREFIX}/:recordId`, ({ params }) => {
    const { recordId } = params

    if (recordId !== '1') {
      return HttpResponse.json<RecordDetailResponseDTO>(
        {
          data: record.recordDetail,
          statusCode: 200,
          message: 'Success',
          success: '직관 기록 상세 조회 성공',
        },
        { status: 200 },
      )
    }

    delay(3000)

    // id가 1일 시 에러 발생
    return HttpResponse.json<ApiErrorMessage>(
      {
        message: 'fail',
        status: 408,
        error: '해당 직관기록을 찾을 수 없습니다.',
        code: 'RECORD001',
      },
      { status: 408 },
    )
  }),
]
