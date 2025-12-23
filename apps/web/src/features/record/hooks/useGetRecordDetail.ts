import { useEffect } from 'react'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { toZonedTime } from 'date-fns-tz'
import { toast } from 'sonner'

import { queryKeys } from '@/entities/record/api/record.queries'
import type {
  RecordDetailResponse,
  RecordResult,
} from '@/entities/record/model/record.type'
import type { TeamKey } from '@/shared/constants/teams'
import { TIME_ZONE } from '@/shared/constants/time'
import { useSessionContext } from '@/entities/auth/hooks/useSessionContext'
import type { RecordDetailResponseDTO } from '@/entities/record/model/record.type'

interface UseGetRecordDetailParams {
  matchRecordId: number
}

interface UseGetRecordDetailResult {
  recordDetail: RecordDetailResponse | null
  isUserSupportingTeam: boolean
  isDuringMatch: boolean
}

export const useGetRecordDetail = ({
  matchRecordId,
}: UseGetRecordDetailParams): UseGetRecordDetailResult &
  UseQueryResult<RecordDetailResponseDTO, Error> => {
  const { user } = useSessionContext()

  const RecordDetailQuery = useQuery(queryKeys.getRecordDetail(matchRecordId))

  const { data, isError } = RecordDetailQuery
  const recordDetail: RecordDetailResponse | null = data?.data ?? null

  useEffect(() => {
    if (isError) {
      toast.error('관람 기록을 불러오는 중 오류가 발생했습니다.')
    }
  }, [isError])

  // 응원 팀 확인
  const isUserSupportingTeam =
    recordDetail &&
    isSupportingTeam({
      userTeam: user?.baseballTeam ?? 'NONE',
      homeTeam: recordDetail.homeTeam,
      awayTeam: recordDetail.awayTeam,
    })

  // 경기 중 판단
  const isDuringMatch =
    recordDetail &&
    checkIsDuringMatch({
      result: recordDetail.result,
      matchDate: recordDetail.matchDate,
    })

  return {
    recordDetail,
    isUserSupportingTeam: Boolean(isUserSupportingTeam),
    isDuringMatch: Boolean(isDuringMatch),
    ...RecordDetailQuery,
  }
}

// 경기 중 판단 함수
// result가 null 이고, 날짜가 오늘 이하면 경기 중
function checkIsDuringMatch({
  result,
  matchDate,
}: {
  result: RecordResult
  matchDate: string
}) {
  const now = toZonedTime(new Date(), TIME_ZONE)
  const matchDateObj = toZonedTime(new Date(matchDate), TIME_ZONE)
  return result === null && matchDateObj <= now
}

// 응원 팀 확인 판단 함수
function isSupportingTeam({
  userTeam,
  homeTeam,
  awayTeam,
}: {
  userTeam: TeamKey
  homeTeam: TeamKey
  awayTeam: TeamKey
}) {
  return userTeam === homeTeam || userTeam === awayTeam
}
