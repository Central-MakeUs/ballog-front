import { useQuery } from '@tanstack/react-query'

import { emotions } from '@/entities/record'

import { useRecordingData } from './useRecordingData'

/**
 * 내 감정 데이터를 조회하는 hook
 * matchRecordId는 useRecordingData에서 자동으로 가져옴 (TanStack Query 캐시 활용)
 *
 * @returns 감정 데이터, 로딩 상태
 */
export const useEmotionData = () => {
  const { recordingData } = useRecordingData()
  const matchRecordId = recordingData?.matchRecordId

  const { data: emotionData, isLoading } = useQuery({
    ...emotions.record(matchRecordId ?? 0),
    enabled: !!matchRecordId,
  })

  return {
    emotionData: emotionData?.data,
    isLoading,
    positivePercent: emotionData?.data.positivePercent ?? 50,
    negativePercent: emotionData?.data.negativePercent ?? 50,
  }
}
