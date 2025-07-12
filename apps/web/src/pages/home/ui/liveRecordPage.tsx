import { AppScreen } from '@stackflow/plugin-basic-ui'
import GameInfoCard from '@/features/record/components/gameInfoCard'
import EmotionRecorder from '@/features/record/components/emotionRecorder'
import RecordEndModal from '@/features/record/components/recordEndModal'
import type { ActivityComponentType } from '@stackflow/react'

const LiveRecordPage: ActivityComponentType = () => {
  return (
    <AppScreen appBar={{ title: '감정 기록 중' }}>
      <div className="max-h-full flex flex-col">
        <div className="flex-grow flex-col items-center gap-4">
          <GameInfoCard />
          <EmotionRecorder />
        </div>
        <RecordEndModal />
      </div>
    </AppScreen>
  )
}

export default LiveRecordPage
