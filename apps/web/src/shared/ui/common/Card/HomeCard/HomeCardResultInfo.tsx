import { cn } from '@/shared/lib/classnames'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'
import { getMatchResult } from '@/shared/lib/getMatchResult'

interface HomeCardResultInfoProps {
  homeTeam: TeamKey
  awayTeam: TeamKey
  homeScore: string
  awayScore: string
}

export const HomeCardResultInfo = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
}: HomeCardResultInfoProps) => {
  const { home: homeResult, away: awayResult } = getMatchResult(
    homeScore,
    awayScore,
  )

  return (
    <div className="flex items-center justify-center mt-2 -mb-1.5 text-center gap-4">
      {/* 홈팀 */}
      <div className="flex flex-col items-center">
        <p className="text-white body-lg-bold">
          {TEAMS[homeTeam].split(' ')[0]}
        </p>
        <p className="text-[48px] font-bold leading-[48px] tracking-[0] text-white">
          {homeScore}
        </p>
        <p className={cn('body-sm-light text-primary-subtle text-white')}>
          {homeResult}
        </p>
      </div>

      <p className="text-white heading-md-bold">vs</p>

      {/* 원정팀 */}
      <div className="flex flex-col items-center">
        <p className="text-white body-lg-bold">
          {TEAMS[awayTeam].split(' ')[0]}
        </p>
        <p className="text-[48px] font-bold leading-[48px] tracking-[0] text-white">
          {awayScore}
        </p>
        <p className={cn('body-sm-light text-primary-subtle text-white')}>
          {awayResult}
        </p>
      </div>
    </div>
  )
}
