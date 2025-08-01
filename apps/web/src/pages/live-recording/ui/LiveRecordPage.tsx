import { AppScreen } from '@stackflow/plugin-basic-ui'
import type { ActivityComponentType } from '@stackflow/react'
import { useFlow } from '@stackflow/react/future'
import { useQuery } from '@tanstack/react-query'

import { cn } from '@/shared/lib/classnames'
import { EmotionVoteWidget } from '@/widgets/emotionVoteWidget/EmotionVoteWidget'
import { Button } from '@/shared/ui/common'
import {
  EmotionVoteProvider,
  useEmotionVote,
} from '@/pages/live-recording/contexts/EmotionVoteContext'
import { calculateGradientColor } from '@/pages/live-recording/utils/calculateGradientColor'
import { useModal } from '@/shared/hooks/modal/useModal'
import SampleImage from '@/assets/grayExampleImage.jpg'
import { emotions } from '@/entities/record/api/emotion.queries'
import { usePostEmotion } from '@/features/record/hooks/usePostEmotion'
import type { EmotionType } from '@/entities/record/model/emotion.type'
import { RecordingCardWithWebBridge } from '@/features/record/ui/RecordingCardWithWebBridge'
import type { RecordingResponse } from '@/entities/record/model/recording.type'
import { recording } from '@/entities/record/api/recording.queries'

const LiveRecordPageInner = ({
  recordingData,
  emotionData,
}: {
  matchId: number
  isLoading: boolean
  recordingData: RecordingResponse
  emotionData: EmotionType
}) => {
  const { mutate } = usePostEmotion()
  const { replace } = useFlow()
  const { openHorizontalModal, openVerticalModal, openImageModal } = useModal()
  const { joyPercent, angryPercent } = useEmotionVote()

  let bgColor = 'transparent'

  if (joyPercent > angryPercent && joyPercent > 50) {
    bgColor = calculateGradientColor('#030303', '#2e4d31', joyPercent)
  } else if (angryPercent > joyPercent && angryPercent > 50) {
    bgColor = calculateGradientColor('#030303', '#57272b', angryPercent)
  }

  const leavePage = () => {
    setTimeout(() => {
      replace('My', {})
    }, 2000)
    openImageModal({
      heading: '기록이 완료되었어요!',
      body: 'Body Text',
      imgSrc: SampleImage,
    })
  }
  const selectMatchResult = () => {
    openVerticalModal({
      heading: '경기 결과를 선택해주세요.',
      body: 'Body text',
      buttons: ['승리', '패배', '무승부', '건너뛰기'].map((label) => ({
        label,
        onClick: () => {
          leavePage()
        },
      })),
    })
  }

  const confirmEndRecord = () => {
    openHorizontalModal({
      heading: '기록을 종료하시겠습니까?',
      body: 'Body text',
      buttons: [
        { label: '취소', onClick: close },
        {
          label: '종료하기',
          onClick: () => {
            close()
            selectMatchResult()
          },
        },
      ],
    })
  }

  return (
    <AppScreen
      backgroundColor={bgColor}
      appBar={{
        title: (
          <span className="flex text-usage-text-default">감정 기록 중</span>
        ),
        height: '48px',
      }}
    >
      {/* 배경 그라데이션 */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[-1]"
        style={{
          background: `linear-gradient(to bottom, ${bgColor}, #030303 80%)`,
        }}
      />

      <div className="max-h-full flex flex-col justify-center items-center px-4 pt-2">
        {/* Recording Card */}
        <RecordingCardWithWebBridge recordingData={recordingData}  />

        {/* 텍스트 */}
        <div
          className={cn(
            'flex flex-col items-center text-center w-full',
            'mt-8 mb-6',
          )}
        >
          <p className="body-lg-bold text-usage-text-default mb-2">
            지금의 감정 클릭하기!
          </p>
          <p className="body-sm-light text-usage-text-subtle">
            기뻐요가 이기고 있어요! <br />
            하지만 지금 기분은 또 다를 수도?
          </p>
        </div>

        {/* 버튼 인터랙션 부분 */}
        <EmotionVoteWidget
          emotions={emotionData}
          onEmotionSubmit={(emotionType) => {
            mutate({ matchRecordId: recordingData.matchRecordId, emotionType })
          }}
        />

        {/* 하단 버튼 */}
        <div className="fixed bottom-10 w-full">
          <div className="px-4 max-w-screen-md mx-auto">
            <Button
              variant="secondary"
              state="pressed"
              size="lg"
              onClick={confirmEndRecord}
              className="w-full"
            >
              기록 종료하기
            </Button>
          </div>
        </div>
      </div>
    </AppScreen> 
  )
}

const LiveRecordPage: ActivityComponentType<{ matchId: string }> = ({
  params,
}: {
  params: { matchId: string }
}) => {
  const matchId = Number(params.matchId)
  const { data: emotionData } = useQuery(emotions.record(matchId))
  const { data: recordingData, isLoading: isRecordingLoading } = useQuery(
    recording.getRecording(matchId),
  )

  if (!emotionData || !recordingData) {
    return <div>로딩 중이거나 데이터를 불러올 수 없습니다.</div>
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
