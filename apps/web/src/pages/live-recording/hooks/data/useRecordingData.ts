import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { recording, recordingPost } from '@/entities/record'
import { useLiveRecordContext } from '@/pages/live-recording/contexts/LiveRecordContext'

interface UseRecordingDataOptions {
  onError?: () => void
}

/**
 * Recording 데이터 조회 및 자동 생성을 담당하는 hook
 * matchId는 LiveRecordContext에서 자동으로 가져옴
 *
 * @param options - 에러 콜백 등 옵션
 * @returns recording 데이터, 로딩 상태, 생성 중 상태
 */
export const useRecordingData = (options?: UseRecordingDataOptions) => {
  const { matchId } = useLiveRecordContext()
  const queryClient = useQueryClient()

  const {
    data: recordingData,
    isLoading,
    isError,
  } = useQuery({
    ...recording.getRecording(matchId),
    retry: false,
    refetchInterval: 3000,
  })

  const createMutation = useMutation({
    mutationFn: () => recordingPost.postRecording(matchId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: recording.getRecording(matchId).queryKey,
      })
    },
    onError: () => {
      options?.onError?.()
    },
  })

  // 데이터가 없을 경우 자동으로 recording 생성
  useEffect(() => {
    if (!isLoading && !recordingData && !createMutation.isPending) {
      createMutation.mutate()
    }
  }, [isLoading, recordingData, createMutation.isPending])

  return {
    recordingData: recordingData?.data,
    isLoading,
    isCreating: createMutation.isPending,
    isError,
  }
}
