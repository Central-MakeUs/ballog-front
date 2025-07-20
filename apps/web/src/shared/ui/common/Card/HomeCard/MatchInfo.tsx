import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'

interface MatchInfoProps extends ComponentProps<'div'> {
  homeTeam: string
  awayTeam: string
}

export const MatchInfo = ({
  homeTeam,
  awayTeam,
  className,
  ...rest
}: MatchInfoProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center w-full px-4 py-12 bg-usage-background-subtle text-brand-primary-default',
        className,
      )}
      {...rest}
    >
      <div className="body-lg-bold">{homeTeam}</div>
      <div className="body-lg-medium text-usage-text-default">vs</div>
      <div className="body-lg-bold">{awayTeam}</div>
    </div>
  )
}
