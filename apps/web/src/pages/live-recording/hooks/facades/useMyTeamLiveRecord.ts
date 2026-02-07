import { useCallback } from 'react'

import { useTeamDetection } from '../team/useTeamDetection'
import { useBackgroundGradient } from '../ui/useBackgroundGradient'
import { usePostEmotion } from '../data/usePostEmotion'
import { useRecordingData } from '../data/useRecordingData'
import { useEmotionData } from '../data/useEmotionData'

/**
 * MyTeamLiveRecordPage의 상태와 로직을 통합하는 Facade hook
 * recordingData와 emotionData는 TanStack Query 캐시에서 자동으로 가져옴
 *
 * @returns 내 팀 페이지에 필요한 데이터와 핸들러
 */
export const useMyTeamLiveRecord = () => {
  const { recordingData } = useRecordingData()
  const { emotionData } = useEmotionData()
  const { myTeamName } = useTeamDetection()
  const { gradientStyle } = useBackgroundGradient({ direction: 'to top' })
  const { mutate } = usePostEmotion()

  const handleEmotionSubmit = useCallback(
    (emotionType: 'POSITIVE' | 'NEGATIVE') => {
      if (!recordingData) return
      mutate({
        matchRecordId: recordingData.matchRecordId,
        emotionType,
      })
    },
    [mutate, recordingData],
  )

  return {
    recordingData,
    emotionData,
    teamName: myTeamName ?? '',
    gradientStyle,
    handleEmotionSubmit,
    matchRecordId: recordingData?.matchRecordId ?? 0,
    imageList: recordingData?.imageList ?? [],
  }
}
