import type { ActivityComponentType } from '@stackflow/react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useFlow } from '@/app/routes/stackflow'
import { EmotionVoteProvider } from '@/pages/live-recording/contexts/EmotionVoteContext'
import { emotions } from '@/entities/record/api/emotion.queries'
import { recording } from '@/entities/record/api/recording.queries'
import { recordingPost } from '@/entities/record/api/recording-post'
import type { RecordingPostResponseDTO } from '@/entities/record/model/recording.type'
import { Loading } from '@/shared/ui/common'
import { useSessionContext } from '@/app/Provider/contexts/sessionContext'

import MyTeamLiveRecordPage from './MyTeamLiveRecordPage'
import OtherTeamLiveRecordPage from './OtherTeamLiveRecordPage'

const LiveRecordPage: ActivityComponentType<{ matchId: string }> = ({
  params,
}: {
  params: { matchId: string }
}) => {
  const { replace } = useFlow()
  const { user } = useSessionContext()

  const matchId = Number(params.matchId)
  const [isPostComplete, setIsPostComplete] = useState<boolean>(false)

  const { mutate } = useMutation<RecordingPostResponseDTO, Error, number>({
    mutationFn: (matchId) => recordingPost.postRecording(matchId),
    onSuccess: () => {
      setIsPostComplete(true)
    },
    onError: () => {
      toast.info('이미 경기 기록이 존재합니다')
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
    mutate(matchId)
  }, [matchId])

  const { data: recordingData, isLoading: isRecordingLoading } = useQuery({
    ...recording.getRecording(matchId),
    enabled: isPostComplete,
  })

  const { data: emotionData } = useQuery({
    ...emotions.record(recordingData?.data.matchRecordId ?? 0),
    enabled: isPostComplete && !!recordingData?.data?.matchRecordId,
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
          emotionData={emotionData?.data}
        />
      )}
    </EmotionVoteProvider>
  )
}

export default LiveRecordPage
