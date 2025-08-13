import React from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'

interface HomeCardDetailInfoProps extends ComponentProps<'div'> {
  dateTime?: string
  homeTeam: TeamKey
  awayTeam: TeamKey
  children?: React.ReactNode
}

export const HomeCardDetailInfo = ({
  dateTime,
  homeTeam,
  awayTeam,
  className,
  children,
  ...rest
}: HomeCardDetailInfoProps) => {
  return (
    <div className={cn('flex flex-col pt-2 w-full', className)} {...rest}>
      <div className="flex flex-col items-center justify-center p-0 relative w-full">
        <div className="body-md-medium text-usage-text-default text-center w-full">
          경기시작 {dateTime}
        </div>
        <div className="heading-md-bold text-usage-text-default flex items-center gap-2">
          <span>{TEAMS[homeTeam].split(' ')[0]}</span>
          <span>vs</span>
          <span>{TEAMS[awayTeam].split(' ')[0]}</span>
        </div>

        {children}
      </div>
    </div>
  )
}
