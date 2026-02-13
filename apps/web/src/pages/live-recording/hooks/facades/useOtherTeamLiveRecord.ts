import { useRecordingData } from '../data/useRecordingData'
import { useTeamsEmotionStats } from '../data/useTeamsEmotionStats'
import { useBackgroundGradient } from '../ui/useBackgroundGradient'
import { useLiveRecordNavigation } from '../ui/useLiveRecordNavigation'

/**
 * OtherTeamLiveRecordPage의 상태와 로직을 통합하는 Facade hook
 * recordingData는 TanStack Query 캐시에서 자동으로 가져옴
 *
 * @returns 타 팀 페이지에 필요한 데이터와 핸들러
 */
export const useOtherTeamLiveRecord = () => {
  const { recordingData } = useRecordingData()
  const { stats, isLoading: isStatsLoading } = useTeamsEmotionStats(
    recordingData?.matchesId ?? 0,
  )
  const { gradientStyle } = useBackgroundGradient({ direction: 'to bottom' })
  const { goBack } = useLiveRecordNavigation()

  return {
    recordingData,
    stats,
    isStatsLoading,
    gradientStyle,
    goBack,
    matchRecordId: recordingData?.matchRecordId ?? 0,
    imageList: recordingData?.imageList ?? [],
  }
}
