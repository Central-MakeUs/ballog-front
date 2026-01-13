import { cn } from '@/shared/lib/classnames'
import { HomeCard } from '@/shared/ui/common/Card/HomeCard'
import { Button } from '@/shared/ui/common/Button'
import { type Match } from '@/entities/match/model/match.type'

interface MatchCardProps extends Match {
  isCenter?: boolean
  onClick?: () => void
}

export const MatchCardToday = ({
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
        {/* TODO : 라이트모드 bg 색상 하드코딩 수정 */}
        <Button
          variant="secondary"
          className={cn(
            `w-full bg-brand-secondary-default light:bg-[#424242] rounded-large duration-800 dark:text-brand-neutral-white light:text-brand-neutral-white
          ${isCenter ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `,
          )}
          onClick={onClick}
        >
          감정 남기기
        </Button>
      </div>
    </HomeCard.Root>
  )
}

export const MatchCardFuture = ({
  homeTeam,
  awayTeam,
  stadium,
  matchesTime,
}: MatchCardProps) => {
  return (
    <HomeCard.Root>
      <HomeCard.DetailInfo
        dateTime={matchesTime}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
      <HomeCard.StadiumInfo stadium={stadium} />
    </HomeCard.Root>
  )
}

export const MatchCardPast = ({
  homeTeam,
  awayTeam,
  stadium,
  matchesResult,
}: MatchCardProps) => {
  const [homeScore, awayScore] = matchesResult
    ? matchesResult.replace(/\s/g, '').split(':')
    : ['-', '-']

  return (
    <HomeCard.Root>
      <HomeCard.ResultInfo
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        homeScore={homeScore}
        awayScore={awayScore}
      />
      <HomeCard.StadiumInfo stadium={stadium} className="pb-2" />
    </HomeCard.Root>
  )
}
