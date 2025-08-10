import { http, HttpResponse, delay } from 'msw'

import type {
  RecordResponseDTO,
  RecordDetailResponseDTO,
  RecordDeleteResponseDTO,
} from '@/entities/record/model/record.type'
import type { ApiErrorMessage } from '@/types/api/common'
import { record } from '@/mocks/data/record'

const RECORD_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/record`

export const recordHandlers = [
  http.get<never, never, ApiErrorMessage | RecordResponseDTO>(
    `${RECORD_API_PREFIX}`,
    () => {
      // 네트워크 지연 효과 추가
      delay(1000)

      const isEmpty = Math.random() > 0.7

      if (isEmpty) {
        return HttpResponse.json<RecordResponseDTO>({
          data: {
            totalCount: 0,
            winRate: 0,
            totalPositiveEmotionPercent: 0,
            totalNegativeEmotionPercent: 0,
            records: [],
          },
          status: 200,
          message: 'Success',
          success: '오늘 경기 일정 조회 성공',
        })
      }

      return HttpResponse.json<RecordResponseDTO>(
        {
          data: {
            totalCount: record.records.length,
            winRate: 50,
            totalPositiveEmotionPercent: 70,
            totalNegativeEmotionPercent: 30,
            records: record.records,
          },
          status: 200,
          message: 'Success',
          success: '오늘 경기 일정 조회 성공',
        },
        { status: 200 },
      )
    },
  ),
  http.get<
    { recordId: string },
    never,
    ApiErrorMessage | RecordDetailResponseDTO
  >(`${RECORD_API_PREFIX}/:recordId`, ({ params }) => {
    const { recordId } = params

    delay(1000)

    // recordId에 해당하는 데이터 찾기
    const recordDetail = record.recordDetails.find(
      (detail) => detail.matchRecordId === Number(recordId),
    )

    if (recordDetail) {
      return HttpResponse.json<RecordDetailResponseDTO>(
        {
          data: recordDetail,
          status: 200,
          message: 'Success',
          success: '직관 기록 상세 조회 성공',
        },
        { status: 200 },
      )
    }

    // 해당 ID의 데이터가 없을 때 에러 반환
    return HttpResponse.json<ApiErrorMessage>(
      {
        message: 'fail',
        status: 404,
        error: '해당 직관기록을 찾을 수 없습니다.',
        code: 'RECORD001',
      },
      { status: 404 },
    )
  }),
  http.delete<
    { recordId: string },
    never,
    ApiErrorMessage | RecordDeleteResponseDTO
  >(`${RECORD_API_PREFIX}/:recordId`, ({ params }) => {
    const { recordId } = params

    delay(1000)

    // recordId에 해당하는 데이터가 있는지 확인
    const recordExists = record.recordDetails.some(
      (detail) => detail.matchRecordId === Number(recordId),
    )

    if (recordExists) {
      return HttpResponse.json<RecordDeleteResponseDTO>(
        {
          data: null,
          status: 200,
          message: 'Success',
          success: '직관 기록 삭제 성공',
        },
        { status: 200 },
      )
    }

    // 해당 ID의 데이터가 없을 때 에러 반환
    return HttpResponse.json<ApiErrorMessage>(
      {
        message: 'fail',
        status: 404,
        error: '해당 직관기록을 찾을 수 없습니다.',
        code: 'RECORD001',
      },
      { status: 404 },
    )
  }),
]
