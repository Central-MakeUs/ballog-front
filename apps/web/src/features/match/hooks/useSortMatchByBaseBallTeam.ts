import { useMemo } from 'react'

import { useUserQuery } from '@/entities/auth/hooks/useUserQuery'
import type { Match } from '@/entities/match/model/match.type'

/**
 *
 * 응원팀 기준으로 경기 배열 정렬 훅
 * @param matches
 * @returns 사용자의 응원팀 경기가 앞에 위치한 matches 배열
 */
export const useSortMatchByBaseBallTeam = (matches: Match[]) => {
  const { user } = useUserQuery()

  const sortedMatches = useMemo(() => {
    if (!user?.baseballTeam || !matches) return matches

    const team = user.baseballTeam

    const favorite = matches.filter(
      (m) => m.homeTeam === team || m.awayTeam === team,
    )

    const others = matches.filter(
      (m) => m.homeTeam !== team && m.awayTeam !== team,
    )
    return [...favorite, ...others]
  }, [matches, user?.baseballTeam])

  return sortedMatches
}
