import { HomeCard } from '@/shared/ui/common/Card/HomeCard'
import { Button } from '@/shared/ui/common/Button'
import { type Match } from '@/entities/match/model/match.type'

interface MatchCardProps extends Match {
  onClick?: () => void
}

export const MatchCard = ({
  homeTeam,
  awayTeam,
  stadium,
  matchesTime,
  onClick,
}: MatchCardProps) => {
  return (
    <HomeCard.Root>
      <HomeCard.DetailInfo
        dateTime={matchesTime}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
      <HomeCard.StadiumInfo stadium={stadium} />

      <div className="w-full">
        <Button
          variant="secondary"
          className="w-full bg-brand-secondary-default rounded-md"
          onClick={onClick}
        >
          기록 시작하기
        </Button>
      </div>
    </HomeCard.Root>
  )
}
