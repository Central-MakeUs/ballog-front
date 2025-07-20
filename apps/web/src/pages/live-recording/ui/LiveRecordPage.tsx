import { cn } from '@/shared/lib/classnames'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import type { ActivityComponentType } from '@stackflow/react'
import { RecordingCard } from '@/features/record/ui/RecordingCard'
import { EmotionVoteWidget } from '@/widgets/emotionVoteWidget/EmotionVoteWidget'
import { Button } from '@/shared/ui/common'
import { useFlow } from '@stackflow/react/future'
import { OverlayModal } from '@/shared/ui/common/OverlayModal'
import { OverlayProvider, useOverlay } from '@/hooks/useOverlay'
import {
  EmotionVoteProvider,
  useEmotionVote,
} from '@/pages/live-recording/contexts/EmotionVoteContext'
import { calculateGradientColor } from '@/pages/live-recording/utils/calculateGradientColor'

const LiveRecordPage = () => {
  return (
    <EmotionVoteProvider>
      <OverlayProvider>
        <LiveRecordPageInner params={{}} />
      </OverlayProvider>
    </EmotionVoteProvider>
  )
}

const LiveRecordPageInner: ActivityComponentType = () => {
  const { replace } = useFlow()

  const { joyPercent, angryPercent } = useEmotionVote()

  let bgColor = 'transparent'

  if (joyPercent > angryPercent && joyPercent > 50) {
    bgColor = calculateGradientColor('#2e4c30', '#00ff11', joyPercent)
  } else if (angryPercent > joyPercent && angryPercent > 50) {
    bgColor = calculateGradientColor('#55262a', '#ff0016', angryPercent)
  }

  // 모달
  const overlay = useOverlay()

  const confirmEndRecord = () => {
    return overlay.open(({ isOpen, close }) => (
      <OverlayModal.Root open={isOpen} onOpenChange={close}>
        <OverlayModal.Text
          heading="기록을 종료하시겠습니까?"
          body="Body text"
        />
        <OverlayModal.Buttons
          layout="horizontal"
          buttons={[
            { label: '취소', onClick: close },
            {
              label: '종료하기',
              onClick: () => {
                close()
                selectMatchResult()
              },
            },
          ]}
        />
      </OverlayModal.Root>
    ))
  }

  const selectMatchResult = () => {
    return overlay.open(({ isOpen, close }) => (
      <OverlayModal.Root open={isOpen} onOpenChange={close}>
        <OverlayModal.Text
          heading="경기 결과를 선택해주세요."
          body="Body text"
        />
        <OverlayModal.Buttons
          layout="vertical"
          buttons={[
            {
              label: '승리',
              onClick: () => {
                close()
                leavePage()
              },
            },
            {
              label: '패배',
              onClick: () => {
                close()
                leavePage()
              },
            },
            {
              label: '무승부',
              onClick: () => {
                close()
                leavePage()
              },
            },
            {
              label: '건너뛰기',
              onClick: () => {
                close()
                leavePage()
              },
            },
          ]}
        />
      </OverlayModal.Root>
    ))
  }

  const leavePage = () => {
    setTimeout(() => {
      replace('Login', {})
    }, 2000)
    return overlay.open(({ isOpen, close }) => (
      <OverlayModal.Root open={isOpen} onOpenChange={close}>
        <OverlayModal.Image imgSrc="/img/end-record.png" />
        <OverlayModal.Text
          heading="기록이 완료되었어요!"
          body="Body text"
          isImageModal
        />
      </OverlayModal.Root>
    ))
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
      <div className="max-h-full flex flex-col justify-center items-center px-4 pt-2">
        {/* Recording Card */}
        <RecordingCard.Root className="w-full">
          <RecordingCard.Icon state="active" />
          <RecordingCard.Info
            homeTeam="LG 트윈스"
            awayTeam="SSG 랜더스"
            stadium="잠실야구장"
            date="2025.07.09"
          />
        </RecordingCard.Root>

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
        <EmotionVoteWidget />

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

export default LiveRecordPage
