import { HomeCard } from '@/shared/ui/common/Card/HomeCard'
import { Button } from '@/shared/ui/common/Button'
import { type Match } from '@/entities/match/model/match.type'

type MatchCardProps = Match

export const MatchCard = ({
  homeTeam,
  awayTeam,
  stadium,
  matchesDate,
  matchesTime,
}: MatchCardProps) => {
  return (
    <HomeCard.Root>
      <HomeCard.MatchInfo homeTeam={homeTeam} awayTeam={awayTeam} />
      <HomeCard.DetailInfo
        stadium={stadium}
        dateTime={`${matchesDate} ${matchesTime}`}
      >
        <Button>기록 시작하기</Button>
      </HomeCard.DetailInfo>
    </HomeCard.Root>
  )
}
