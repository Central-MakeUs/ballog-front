import { AppScreen } from '@stackflow/plugin-basic-ui'
import GameInfoCard from '@/features/record/components/gameInfoCard'
import EmotionRecorder from '@/features/record/components/emotionRecorder'
import RecordEndModal from '@/features/record/components/recordEndModal'
import type { ActivityComponentType } from '@stackflow/react'
import { RecordingCard } from '@/shared/ui/common/Card/RecordingCard'

const LiveRecordPage: ActivityComponentType = () => {
  return (
    <AppScreen appBar={{ title: '감정 기록 중' }}>
      <div className="max-h-full flex flex-col px-4">
        <RecordingCard.Root className='w-full'>
          <RecordingCard.Icon state="active" />
          <RecordingCard.Info
            homeTeam="LG 트윈스"
            awayTeam="SSG 랜더스"
            stadium="잠실야구장"
            date="2025.07.09"
          />
        </RecordingCard.Root>
        <div className="flex-grow flex-col items-center gap-4">
          {/* <GameInfoCard /> */}
          <EmotionRecorder />
        </div>
        <RecordEndModal />
      </div>
    </AppScreen>
  )
}

export default LiveRecordPage
