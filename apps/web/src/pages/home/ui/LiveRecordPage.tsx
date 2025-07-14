import { cn } from '@/shared/lib/utils'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import GameInfoCard from '@/features/record/components/gameInfoCard'
import EmotionRecorder from '@/features/record/components/emotionRecorder'
import RecordEndModal from '@/features/record/components/recordEndModal'
import type { ActivityComponentType } from '@stackflow/react'
import { RecordingCard } from '@/shared/ui/common/Card/RecordingCard'
import { EmotionVoteWidget } from '@/widgets/emotionVoteWidget/EmotionVoteWidget'
import { Button } from '@/shared/ui/common'
import { useFlow } from '@stackflow/react/future'

const LiveRecordPage: ActivityComponentType = () => {
  const { replace, push } = useFlow()
  return (
    <AppScreen
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
