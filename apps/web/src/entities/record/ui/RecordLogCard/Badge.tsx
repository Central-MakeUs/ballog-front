import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import { type RecordResult } from '@/entities/record/model/record.type'

interface BadgeProps extends ComponentProps<'div'> {
  result: RecordResult
}

export const Badge = ({ result = 'DRAW', className, ...rest }: BadgeProps) => {
  const badgeColor = {
    WIN: 'bg-brand-green-subtle text-brand-green-default',
    LOSS: 'bg-brand-red-subtle text-brand-red-default',
    DRAW: 'bg-brand-secondary-subtle text-brand-neutral-70',
  }[result ?? 'DRAW']

  const badgeText = {
    WIN: '승리',
    LOSS: '패배',
    DRAW: '무승부',
  }[result ?? 'DRAW']

  return (
    <div
      className={cn(
        'absolute top-4 right-4 px-3 py-1 caption-md-medium rounded-large',
        badgeColor,
        className,
      )}
      {...rest}
    >
      {badgeText}
    </div>
  )
}
