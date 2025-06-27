import Header from '@/components/common/Header'
import GameInfoCard from '@/features/record/components/gameInfoCard'
import EmotionRecorder from '@/features/record/components/emotionRecorder'
import RecordEndModal from '@/features/record/components/recordEndModal'

const LiveRecordPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title={<p className="font-bold text-base">감정 기록 중</p>} />
      <div className="flex-grow flex-col items-center gap-4">
        <GameInfoCard />
        <EmotionRecorder />
      </div>
      <RecordEndModal />
    </div>
  )
}

export default LiveRecordPage
