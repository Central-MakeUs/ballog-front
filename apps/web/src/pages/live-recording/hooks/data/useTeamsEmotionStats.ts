import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/entities/record'

const REFETCH_INTERVAL = 30_000 // 30초

/**
 * 양 팀 감정 통계를 조회하는 hook (타 팀 경기용)
 *
 * @param matchesId - 경기 ID
 * @returns 양 팀 감정 통계 데이터, 로딩 상태
 */
export const useTeamsEmotionStats = (matchesId: number) => {
  const { data, isLoading } = useQuery({
    ...queryKeys.getEmotionStats(matchesId),
    refetchInterval: REFETCH_INTERVAL,
  })

  return {
    stats: data?.data,
    isLoading,
  }
}
