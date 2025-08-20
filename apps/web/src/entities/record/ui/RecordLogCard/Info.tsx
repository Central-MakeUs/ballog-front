import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'
import { getStadiumName, type StadiumKey } from '@/shared/constants/stadium'
import type { RecordResult } from '@/entities/record/model/record.type'

interface InfoProps extends ComponentProps<'div'> {
  homeTeam: TeamKey
  awayTeam: TeamKey
  stadium: StadiumKey
  date: string
  result: RecordResult
}

export const Info = ({
  homeTeam,
  awayTeam,
  stadium,
  date,
  result,
  className,
  ...rest
}: InfoProps) => {
  // 경기 결과가 없으면 일단 DRAW처리
  // 하지만 렌더링 되지는 않음
  const fontColor = {
    WIN: 'text-brand-green-default',
    LOSE: 'text-brand-red-default',
    DRAW: 'text-brand-neutral-70',
  }[result ?? 'DRAW']

  const badgeText = {
    WIN: '승리',
    LOSE: '패배',
    DRAW: '무승부',
  }[result ?? 'DRAW']

  return (
    <div
      className={cn('relative p-6 gap-1 flex flex-col', className)}
      {...rest}
    >
      {result && <p className={cn('body-sm-bold', fontColor)}>{badgeText}</p>}
      <p className="body-lg-bold text-usage-text-default">
        {TEAMS[homeTeam]} <span className="mx-2">vs</span> {TEAMS[awayTeam]}
      </p>
      <p className="body-sm-light text-usage-text-subtle">
        {getStadiumName(stadium)} <span className="mx-2">|</span> {date}
      </p>
    </div>
  )
}
