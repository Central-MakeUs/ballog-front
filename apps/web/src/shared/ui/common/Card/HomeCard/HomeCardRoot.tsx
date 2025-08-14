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
        'items-center justify-start overflow-clip p-4 relative rounded-md min-w-50 w-full',
        '[background:linear-gradient(180deg,_#4EB65A_0%,_#36C1B3_100%)]',
        className,
      )}
      data-name={`state=${state}`}
      {...rest}
    >
      {children}
    </div>
  )
}
