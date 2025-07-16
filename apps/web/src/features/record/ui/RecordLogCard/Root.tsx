import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/classnames'
import type { ReactNode } from 'react'

interface RootProps extends ComponentProps<'div'> {
  children: ReactNode
}

export const Root = ({ children, className, ...rest }: RootProps) => (
  <div
    className={cn(
      'flex flex-col w-[328px] relative rounded-large bg-usage-background-subtle',
      className,
    )}
    {...rest}
  >
    {children}
  </div>
)
