import type { ActivityComponentType } from '@stackflow/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { useFlow } from '@/app/routes/stackflow'
import { EmotionVoteProvider } from '@/pages/live-recording/contexts/EmotionVoteContext'
import { emotions } from '@/entities/record/api/emotion.queries'
import { recording } from '@/entities/record/api/recording.queries'
import { recordingPost } from '@/entities/record/api/recording-post'
import { Loading } from '@/shared/ui/common'
import { useUserQuery } from '@/entities/auth/hooks/useUserQuery'

import MyTeamLiveRecordPage from './MyTeamLiveRecordPage'
import OtherTeamLiveRecordPage from './OtherTeamLiveRecordPage'

const LiveRecordPage: ActivityComponentType<{ matchId: string }> = ({
  params,
}: {
  params: { matchId: string }
}) => {
  const { replace } = useFlow()
  const { user } = useUserQuery()
  const queryClient = useQueryClient()

  const matchId = Number(params.matchId)

  const { data: recordingData, isLoading: isRecordingLoading } = useQuery({
    ...recording.getRecording(matchId),
    retry: false,
  })

  const createMutation = useMutation({
    mutationFn: () => recordingPost.postRecording(matchId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: recording.getRecording(matchId).queryKey,
      })
    },
    onError: () => {
      toast.info('알 수 없는 오류 발생')
      replace(
        'Home',
        {},
        {
          animate: false,
        },
      )
    },
  })

  useEffect(() => {
    if (!isRecordingLoading && !recordingData) {
      createMutation.mutate()
    }
  }, [isRecordingLoading, recordingData])

  const { data: emotionData } = useQuery({
    ...emotions.record(recordingData?.data.matchRecordId ?? 0),
    enabled: !!recordingData?.data?.matchRecordId,
  })

  if (!emotionData || !recordingData) {
    return <Loading text="페이지 불러오는 중..." />
  }

  // 내 팀 확인
  const myTeam = user?.baseballTeam
  const isMyTeam =
    myTeam === recordingData.data.homeTeam ||
    myTeam === recordingData.data.awayTeam

  const joy = emotionData?.data.positivePercent ?? 50
  const angry = emotionData?.data.negativePercent ?? 50

  return (
    <EmotionVoteProvider initialJoyPercent={joy} initialAngryPercent={angry}>
      {isMyTeam ? (
        <MyTeamLiveRecordPage
          recordingData={recordingData.data}
          matchId={matchId}
          isLoading={isRecordingLoading}
          emotionData={emotionData?.data}
        />
      ) : (
        <OtherTeamLiveRecordPage
          recordingData={recordingData.data}
          matchId={matchId}
          isLoading={isRecordingLoading}
        />
      )}
    </EmotionVoteProvider>
  )
}

export default LiveRecordPage
