import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/classnames'

interface BadgeProps extends ComponentProps<'div'> {
  result: 'win' | 'lose' | 'draw'
}

export const Badge = ({ result, className, ...rest }: BadgeProps) => {
  const badgeColor = {
    win: 'bg-brand-green-subtle text-brand-green-default',
    lose: 'bg-brand-red-subtle text-brand-red-default',
    draw: 'bg-brand-secondary-subtle text-brand-neutral-70',
  }[result]

  const badgeText = {
    win: '승리',
    lose: '패배',
    draw: '무승부',
  }[result]

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
