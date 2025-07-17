import { cn } from '@/shared/lib/classnames'
import type { ComponentProps, ReactNode } from 'react'

interface RootProps extends ComponentProps<'div'> {
  children: ReactNode
}

export const Root = ({ children, className, ...rest }: RootProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between w-full max-w-82 p-4 rounded-xlarge',
        'bg-usage-background-subtle',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
