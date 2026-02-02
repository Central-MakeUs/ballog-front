import { useUserQuery } from '@/entities/auth/hooks/useUserQuery'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'

import { useRecordingData } from '../data/useRecordingData'

/**
 * 사용자 팀 여부를 판별하는 hook
 * recordingData는 useRecordingData에서 자동으로 가져옴 (TanStack Query 캐시 활용)
 *
 * @returns 내 팀 여부, 팀 키, 팀 이름
 */
export const useTeamDetection = () => {
  const { user } = useUserQuery()
  const { recordingData } = useRecordingData()

  const myTeamKey = user?.baseballTeam as TeamKey | undefined
  const myTeamName = myTeamKey ? TEAMS[myTeamKey] : undefined

  const isMyTeam =
    !!recordingData &&
    !!myTeamKey &&
    (myTeamKey === recordingData.homeTeam || myTeamKey === recordingData.awayTeam)

  return {
    isMyTeam,
    myTeamKey,
    myTeamName,
  }
}
