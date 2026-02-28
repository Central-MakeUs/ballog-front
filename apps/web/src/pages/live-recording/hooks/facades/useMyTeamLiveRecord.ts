import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'

import { recording } from '@/entities/record/api/recording.queries'
import { useUserQuery } from '@/entities/auth/hooks/useUserQuery'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'
import { useLiveRecordContext } from '@/pages/live-recording/contexts/LiveRecordContext'
import { useLiveRecordingMachineContext } from '@/pages/live-recording/contexts/LiveRecordingMachineContext'
import { useEmotionVote } from '@/pages/live-recording/contexts/EmotionVoteContext'

import { useBackgroundGradient } from '../ui/useBackgroundGradient'

/**
 * MyTeamLiveRecordPage facade
 *
 * - FSM Context에서 상태/액션을 가져옴
 * - recordingData는 React Query 캐시에서 읽기 전용으로 조회 (FSM Command가 setQueryData로 채움)
 * - 팀 판별은 RQ 캐시 기반으로 직접 수행 (useRecordingData의 refetchInterval 회피)
 */
export const useMyTeamLiveRecord = () => {
  const { matchId } = useLiveRecordContext()
  const { snapshot, dispatchEmotionClick } = useLiveRecordingMachineContext()
  const { joyPercent, angryPercent } = useEmotionVote()
  const { gradientStyle } = useBackgroundGradient({ direction: 'to top' })

  // 유저 정보
  const { user } = useUserQuery()
  const myTeamKey = user?.baseballTeam as TeamKey | undefined
  const myTeamName = myTeamKey ? TEAMS[myTeamKey] : undefined

  // RQ 캐시에서 읽기 전용 (FSM Command가 채워줌, 폴링 없음)
  const { data: recordingResponse } = useQuery({
    ...recording.getRecording(matchId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
  const recordingData = recordingResponse?.data

  // 팀 판별 (useTeamDetection이 useRecordingData를 호출하므로 직접 수행)
  const isMyTeam =
    !!recordingData &&
    !!myTeamKey &&
    (myTeamKey === recordingData.homeTeam ||
      myTeamKey === recordingData.awayTeam)

  const handleEmotionSubmit = useCallback(
    (emotionType: 'POSITIVE' | 'NEGATIVE') => {
      dispatchEmotionClick(emotionType)
    },
    [dispatchEmotionClick],
  )

  return {
    recordingData,
    isMyTeam,
    teamName: myTeamName ?? '',
    gradientStyle,
    handleEmotionSubmit,
    machineState: snapshot.state,
    matchRecordId: recordingData?.matchRecordId ?? 0,
    imageList: recordingData?.imageList ?? [],
    joyPercent,
    angryPercent,
  }
}
