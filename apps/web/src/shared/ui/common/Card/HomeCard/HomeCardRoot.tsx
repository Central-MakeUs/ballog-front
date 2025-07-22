import React from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'

interface HomeCardRootProps extends ComponentProps<'div'> {
  children?: React.ReactNode
  state?: 'disabled' | 'default'
}

export const HomeCardRoot = ({
  children,
  className,
  state = 'default',
  ...rest
}: HomeCardRootProps) => {
  return (
    <div
      className={cn(
        'flex flex-col',
        'items-center justify-start overflow-clip pt-0 px-0 relative rounded-lg min-w-50 w-full',
        className,
      )}
      data-name={`state=${state}`}
      {...rest}
    >
      {children}
    </div>
  )
}
