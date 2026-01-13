import type { ComponentProps } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/classnames'
import { CloseIcon } from '@/assets/CloseIcon'

interface RootProps extends ComponentProps<'div'> {
  open: boolean
  onOpenChange: (open: boolean) => void
  dismissible?: boolean
  children: ReactNode
}

export const Root = ({
  open,
  onOpenChange,
  dismissible = false,
  children,
  className,
  ...rest
}: RootProps) => {
  if (!open) return null

  return (
    <div className={cn('flex flex-col justify-end', className)} {...rest}>
      <div
        className={cn(
          'relative w-full',
          'rounded-t-2xl rounded-b-none p-8 border-none',
          'bg-usage-background-strong light:bg-usage-background-default gap-6 flex flex-col',
        )}
      >
        {dismissible && (
          <CloseIcon
            className="absolute top-2 right-2 dark:text-white light:text-black"
            onClick={() => onOpenChange(false)}
          />
        )}
        {children}
      </div>
    </div>
  )
}
