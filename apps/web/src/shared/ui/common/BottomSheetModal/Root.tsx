import { cn } from '@/shared/lib/utils'
import type { ComponentProps } from 'react'
import type { ReactNode } from 'react'
import WhiteCloseButton from '@/assets/whiteCloseButton.svg?react'

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

  const handleBackdropClick = () => {
    if (dismissible) onOpenChange(false)
  }

  return (
    <div className={cn('fixed inset-0 z-50', className)} {...rest}>
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleBackdropClick}
      />
      <div
        className={cn(
          'relative w-full max-w-116.5',
          'rounded-t-2xl rounded-b-none p-8 border-none',
          'bg-usage-background-strong',
        )}
      >
        {dismissible && (
          <WhiteCloseButton
            className="absolute top-2 right-2"
            onClick={() => onOpenChange(false)}
          />
        )}
        {children}
      </div>
    </div>
  )
}
