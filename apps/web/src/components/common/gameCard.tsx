type GameCardProps = {
  homeTeam: string
  awayTeam: string
  stadium: string
  date: string
  thumbnail?: string
}

const GameCard = ({
  homeTeam,
  awayTeam,
  stadium,
  date,
  thumbnail,
}: GameCardProps) => {
  return (
    <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
      <div className="text-center font-bold">
        <span className="mr-1">{`{${homeTeam}}`}</span> vs{' '}
        <span className="ml-1">{`{${awayTeam}}`}</span>
      </div>
      <div className="text-center text-sm text-gray-500 mt-1">
        {`{${stadium}}`} | {`{${date}}`}
      </div>
      <div className="mt-3">
        {thumbnail && (
          <div className="w-full h-24 bg-gray-300 rounded-md overflow-hidden">
            <img
              src={thumbnail}
              alt="경기 썸네일"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default GameCard
