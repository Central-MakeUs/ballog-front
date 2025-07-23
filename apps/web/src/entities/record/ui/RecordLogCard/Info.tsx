import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'

interface InfoProps extends ComponentProps<'div'> {
  homeTeam: TeamKey
  awayTeam: TeamKey
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
      {TEAMS[homeTeam]} <span className="mx-2">vs</span> {TEAMS[awayTeam]}
    </p>
    <p className="body-sm-light text-usage-text-subtle">
      {stadium} <span className="mx-2">|</span> {date}
    </p>
  </div>
)
