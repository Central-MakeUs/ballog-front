import { cn } from '@/shared/lib/classnames'
import { HomeCard } from '@/shared/ui/common/Card/HomeCard'
import { Button } from '@/shared/ui/common/Button'
import { type Match } from '@/entities/match/model/match.type'

interface MatchCardProps extends Match {
  isCenter: boolean
  onClick?: () => void
}

export const MatchCard = ({
  homeTeam,
  awayTeam,
  stadium,
  matchesTime,
  isCenter,
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
          className={cn(
            `w-full bg-brand-secondary-default rounded-md duration-800
          ${isCenter ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `,
          )}
          onClick={onClick}
        >
          기록 시작하기
        </Button>
      </div>
    </HomeCard.Root>
  )
}
