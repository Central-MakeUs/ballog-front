import Header from '@/components/common/Header'
import GameInfoCard from '@/features/record/components/gameInfoCard'
import EmotionRecorder from '@/features/record/components/emotionRecorder'

const LiveRecordPage = () => {
  return (
    <div>
      <Header title={<p className="font-bold text-base">감정 기록 중</p>} />
      <GameInfoCard />
      <EmotionRecorder />
    </div>
  )
}

export default LiveRecordPage
