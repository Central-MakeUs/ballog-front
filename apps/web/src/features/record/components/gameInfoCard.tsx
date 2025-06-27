import ImageUploader from './imageUploader'

const mockData = {
  homeTeam: '롯데',
  awayTeam: 'KT',
  stadium: '사직경기장',
  date: '2025.06.18',
}

const GameInfoCard = () => {
  return (
    <div className="flex flex-col items-center gap-5 p-8 bg-[#f5f5f5]">
      <ImageUploader />
      <div className="text-center">
        <p className="font-bold">{`${mockData.homeTeam} vs ${mockData.awayTeam}`}</p>
        <p className="text-gray-500 text-sm">{`${mockData.stadium} | ${mockData.date}`}</p>
      </div>
    </div>
  )
}

export default GameInfoCard
