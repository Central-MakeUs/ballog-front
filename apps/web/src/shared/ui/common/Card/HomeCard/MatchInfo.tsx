interface MatchInfoProps {
  homeTeam: string
  awayTeam: string
}

export const MatchInfo = ({ homeTeam, awayTeam }: MatchInfoProps) => {
  return (
    <div className="flex flex-col items-center w-full px-4 py-12 bg-usage-background-subtle text-brand-primary-default">
      <div className="body-lg-bold">{homeTeam}</div>
      <div className="body-lg-medium text-usage-text-default">vs</div>
      <div className="body-lg-bold">{awayTeam}</div>
    </div>
  )
}