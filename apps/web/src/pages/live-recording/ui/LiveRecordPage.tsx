import { AppScreen } from '@stackflow/plugin-basic-ui'
import type { ActivityComponentType } from '@stackflow/react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useFlow } from '@/app/routes/stackflow'
import { cn } from '@/shared/lib/classnames'
import { EmotionVoteWidget } from '@/pages/live-recording/ui/EmotionVoteWidget'
import {
  EmotionVoteProvider,
  useEmotionVote,
} from '@/pages/live-recording/contexts/EmotionVoteContext'
import { calculateGradientColor } from '@/pages/live-recording/utils/calculateGradientColor'
import { emotions } from '@/entities/record/api/emotion.queries'
import { usePostEmotion } from '@/pages/live-recording/hooks/usePostEmotion'
import type { EmotionType } from '@/entities/record/model/emotion.type'
import { RecordingCardWithWebBridge } from '@/features/record/ui/RecordingCardWithWebBridge'
import type { RecordingResponse } from '@/entities/record/model/recording.type'
import { recording } from '@/entities/record/api/recording.queries'
import { EndRecordingButton } from '@/features/record/ui/EndRecordingButton'
import { recordingPost } from '@/entities/record/api/recording-post'
import type { RecordingPostResponseDTO } from '@/entities/record/model/recording.type'
import { Loading } from '@/shared/ui/common'
import { LottieRefProvider } from '@/pages/live-recording/contexts/lottieRefContext'
import { BackArrow } from '@/assets/BackArrow'
import { useEndRecordingFlow } from '@/features/record/hooks/useEndRecordingFlow'

import { ToolTipPopover } from './ToolTipPopover'

const LiveRecordPageInner = ({
  recordingData,
  emotionData,
}: {
  matchId: number
  isLoading: boolean
  recordingData: RecordingResponse
  emotionData: EmotionType
}) => {
  const { confirmEndRecord } = useEndRecordingFlow()
  const { mutate } = usePostEmotion()
  const { joyPercent, angryPercent } = useEmotionVote()
  const dominant = joyPercent >= angryPercent ? '기뻐요' : '화나요'

  let bgColor = 'transparent'

  if (joyPercent > angryPercent && joyPercent > 50) {
    bgColor = calculateGradientColor('joy', joyPercent)
  } else if (angryPercent > joyPercent && angryPercent > 50) {
    bgColor = calculateGradientColor('angry', angryPercent)
  }

  return (
    <AppScreen
      backgroundColor={bgColor}
      appBar={{
        title: (
          <span className="flex text-usage-text-default">감정 기록 중</span>
        ),
        activityEnterStyle: 'slideInLeft',
        backButton: {
          renderIcon: () => <BackArrow />,
          onClick: (e) => {
            // stackflow default event 방지
            e.preventDefault()
            confirmEndRecord()
          },
        },
        height: '48px',
      }}
    >
      {/* 배경 그라데이션 */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        style={{
          background: `linear-gradient(to bottom, ${bgColor}, #030303 40%)`,
        }}
      />
      <div className="max-h-full flex flex-col justify-center items-center px-4 pt-2 w-full">
        {/* Recording Card */}
        <RecordingCardWithWebBridge recordingData={recordingData} />

        {/* 텍스트 */}
        <div
          className={cn(
            'flex flex-col items-center text-center w-full',
            'mt-8 mb-8',
          )}
        >
          <div className="body-lg-bold text-usage-text-default mb-2 inline-flex items-center relative">
            지금의 감정 클릭하기! <ToolTipPopover />
          </div>
          <p className="body-sm-light text-usage-text-subtle">
            {dominant} 이기고 있어요! <br />
            하지만 지금 기분은 또 다를 수도?
          </p>
        </div>

        {/* 버튼 인터랙션 부분 */}
        <LottieRefProvider>
          <EmotionVoteWidget
            emotions={emotionData}
            onEmotionSubmit={(emotionType) => {
              mutate({
                matchRecordId: recordingData.matchRecordId,
                emotionType,
              })
            }}
          />
        </LottieRefProvider>

        {/* 하단 버튼 */}
        <EndRecordingButton />
      </div>
    </AppScreen>
  )
}

const LiveRecordPage: ActivityComponentType<{ matchId: string }> = ({
  params,
}: {
  params: { matchId: string }
}) => {
  const { replace } = useFlow()

  const matchId = Number(params.matchId)
  const [isPostComplete, setIsPostComplete] = useState<boolean>(false)

  const { mutate } = useMutation<RecordingPostResponseDTO, Error, number>({
    mutationFn: (matchId) => recordingPost.postRecording(matchId),
    onSuccess: () => {
      setIsPostComplete(true)
    },
    onError: () => {
      // setIsPostComplete(true)
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
    enabled: isPostComplete, // POST 완료 후 활성화
  })

  const { data: emotionData } = useQuery({
    ...emotions.record(recordingData?.data.matchRecordId ?? 0),
    enabled: isPostComplete && !!recordingData?.data?.matchRecordId,
  })

  if (!emotionData || !recordingData) {
    return <Loading text="페이지 불러오는 중..." />
  }

  const joy = emotionData?.data.positivePercent ?? 50
  const angry = emotionData?.data.negativePercent ?? 50

  return (
    <EmotionVoteProvider initialJoyPercent={joy} initialAngryPercent={angry}>
      <LiveRecordPageInner
        recordingData={recordingData.data}
        matchId={matchId}
        isLoading={isRecordingLoading}
        emotionData={emotionData?.data}
      />
    </EmotionVoteProvider>
  )
}

export default LiveRecordPage
