import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/shared/lib/classnames'

interface RootProps extends ComponentProps<'div'> {
  children: ReactNode
}

export const Root = ({ children, className, ...rest }: RootProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 w-[328px] flex-shrink-0 rounded-xlarge bg-usage-background-subtle',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
