import type { ReactNode } from 'react'
import type { ComponentProps } from 'react'

import BoxAndLeaf from '@/assets/boxAndLeaf.svg?react'
import { cn } from '@/shared/lib/classnames'

interface DisabledProps extends ComponentProps<'div'> {
  children?: ReactNode
}

export const Disabled = ({ children, className, ...rest }: DisabledProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center min-w-[200px] min-h-[324px] overflow-hidden rounded-medium w-full',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col items-center justify-center w-full h-full py-12 px-4 bg-usage-background-subtle">
        <BoxAndLeaf className="w-12.75 mb-2.5" />
        {children}
      </div>
    </div>
  )
}
