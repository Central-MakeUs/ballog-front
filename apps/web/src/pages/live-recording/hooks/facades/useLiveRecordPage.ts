import { useRecordingData } from '../data/useRecordingData'
import { useEmotionData } from '../data/useEmotionData'
import { useTeamDetection } from '../team/useTeamDetection'
import { useLiveRecordNavigation } from '../ui/useLiveRecordNavigation'

/**
 * LiveRecordPage의 모든 상태와 로직을 통합하는 Facade hook
 * matchId는 LiveRecordContext에서 자동으로 가져옴
 *
 * @returns 페이지에 필요한 모든 데이터와 상태
 */
export const useLiveRecordPage = () => {
  const { handleError } = useLiveRecordNavigation()

  const {
    recordingData,
    isLoading: isRecordingLoading,
    isCreating,
  } = useRecordingData({ onError: handleError })

  const {
    emotionData,
    isLoading: isEmotionLoading,
    positivePercent,
    negativePercent,
  } = useEmotionData()

  const { isMyTeam, myTeamKey, myTeamName } = useTeamDetection()

  const isLoading = isRecordingLoading || isCreating || isEmotionLoading
  const isReady = !!recordingData && !!emotionData

  return {
    isLoading,
    isReady,
    isMyTeam,
    myTeamKey,
    myTeamName,
    initialJoyPercent: positivePercent,
    initialAngryPercent: negativePercent,
  }
}
