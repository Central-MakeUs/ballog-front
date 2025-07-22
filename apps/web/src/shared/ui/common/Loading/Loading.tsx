import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'

interface LoadingProps extends ComponentProps<'div'> {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export const Loading = ({
  size = 'md',
  text = '로딩 중...',
  className,
  ...rest
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        'w-full',
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-brand-neutral-30',
          'border-t-brand-primary-default',
          sizeClasses[size],
        )}
      />
      <p className="body-md-medium text-usage-text-subtle">{text}</p>
    </div>
  )
}
