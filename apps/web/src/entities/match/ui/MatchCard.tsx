import { HomeCard } from '@/shared/ui/common/Card/HomeCard'
import { Button } from '@/shared/ui/common/Button'
import { type Match } from '@/entities/match/model/match.type'
import { useFlow } from '@/shared/lib/stackflow'

type MatchCardProps = Match

export const MatchCard = ({
  homeTeam,
  awayTeam,
  stadium,
  matchesDate,
  matchesTime,
  matchesId,
}: MatchCardProps) => {
  const { push } = useFlow()
  return (
    <HomeCard.Root>
      <HomeCard.MatchInfo homeTeam={homeTeam} awayTeam={awayTeam} />
      <HomeCard.DetailInfo
        stadium={stadium}
        dateTime={`${matchesDate} ${matchesTime}`}
      >
        <Button
          onClick={() => push('LiveRecord', { recordId: String(matchesId) })}
        >
          기록 시작하기
        </Button>
      </HomeCard.DetailInfo>
    </HomeCard.Root>
  )
}
