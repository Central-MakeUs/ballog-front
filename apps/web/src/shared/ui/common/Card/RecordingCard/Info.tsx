interface InfoProps {
  homeTeam: string
  awayTeam: string
  stadium: string
  date: string
}

export const Info = ({ homeTeam, awayTeam, stadium, date }: InfoProps) => {
  return (
    <div>
      <div className="body-md-bold text-usage-text-default">
        {homeTeam} <span className="mx-1">vs</span> {awayTeam}
      </div>
      <div className="body-sm-light text-usage-text-subtle">
        {stadium} <span className="mx-1">|</span> {date}
      </div>
    </div>
  )
}