import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

interface InfoProps extends ComponentProps<'div'> {
  homeTeam: string
  awayTeam: string
  stadium: string
  date: string
}

export const Info = ({
  homeTeam,
  awayTeam,
  stadium,
  date,
  className,
  ...rest
}: InfoProps) => {
  return (
    <div className={cn('', className)} {...rest}>
      <div className="body-md-bold text-usage-text-default">
        {homeTeam} <span className="mx-1">vs</span> {awayTeam}
      </div>
      <div className="body-sm-light text-usage-text-subtle">
        {stadium} <span className="mx-1">|</span> {date}
      </div>
    </div>
  )
}
