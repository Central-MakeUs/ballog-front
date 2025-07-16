import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/classnames'

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
}: InfoProps) => (
  <div className={cn('relative p-6', className)} {...rest}>
    <p className="body-lg-bold text-usage-text-default">
      {homeTeam} <span className="mx-2">vs</span> {awayTeam}
    </p>
    <p className="body-sm-light text-usage-text-subtle">
      {stadium} <span className="mx-2">|</span> {date}
    </p>
  </div>
)
