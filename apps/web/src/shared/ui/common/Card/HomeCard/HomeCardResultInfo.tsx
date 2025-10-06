import { cn } from '@/shared/lib/classnames'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'

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
  const homeResult =
    Number(homeScore) > Number(awayScore)
      ? '승'
      : Number(homeScore) < Number(awayScore)
        ? '패'
        : '무'
  const awayResult =
    Number(awayScore) > Number(homeScore)
      ? '승'
      : Number(awayScore) < Number(homeScore)
        ? '패'
        : '무'

  return (
    <div className="flex items-center justify-center mt-2 -mb-1.5 text-center gap-4">
      {/* 홈팀 */}
      <div className="flex flex-col items-center">
        <p className="body-lg-bold text-white">
          {TEAMS[homeTeam].split(' ')[0]}
        </p>
        <p className="text-[48px] font-bold leading-[48px] tracking-[0] text-usage-text-default">
          {homeScore}
        </p>
        <p className={cn('body-sm-light text-primary-subtle')}>{homeResult}</p>
      </div>

      <p className="heading-md-bold text-usage-text-default">vs</p>

      {/* 원정팀 */}
      <div className="flex flex-col items-center">
        <p className="body-lg-bold text-usage-text-default">
          {TEAMS[awayTeam].split(' ')[0]}
        </p>
        <p className="text-[48px] font-bold leading-[48px] tracking-[0] text-white">
          {awayScore}
        </p>
        <p className={cn('body-sm-light text-primary-subtle')}>{awayResult}</p>
      </div>
    </div>
  )
}
