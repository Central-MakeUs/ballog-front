import { AppScreen } from '@stackflow/plugin-basic-ui'
import Header from '@/components/common/Header'
import GameInfoCard from '@/features/record/components/gameInfoCard'
import EmotionRecorder from '@/features/record/components/emotionRecorder'
import RecordEndModal from '@/features/record/components/recordEndModal'
import type { ActivityComponentType } from '@stackflow/react'

const LiveRecordPage: ActivityComponentType = () => {
  return (
    <AppScreen appBar={{ title: '감정 기록 중' }}>
      {/* <AppScreen> */}
      {/* <div className="min-h-screen flex flex-col"> */}
      <div className="max-h-full flex flex-col">
        {/* <Header title={<p className="font-bold text-base">감정 기록 중</p>} /> */}
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
