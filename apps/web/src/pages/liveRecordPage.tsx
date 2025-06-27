import Header from '@/components/common/Header'
import GameInfoCard from '@/features/record/components/gameInfoCard'

const LiveRecordPage = () => {
  return (
    <div>
      <Header title={<p className="font-bold text-base">감정 기록 중</p>} />
      <GameInfoCard />
    </div>
  )
}

export default LiveRecordPage
