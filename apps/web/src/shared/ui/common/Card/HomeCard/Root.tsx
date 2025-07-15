import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/classnames'
import type { ReactNode } from 'react'

interface HomeCardRootProps extends ComponentProps<'div'> {
  children?: ReactNode
}

export const Root = ({ children, className, ...rest }: HomeCardRootProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center w-full max-w-[200px] pb-2 overflow-hidden rounded-medium',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
