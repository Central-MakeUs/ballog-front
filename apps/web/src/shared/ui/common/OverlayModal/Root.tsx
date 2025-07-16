import { Dialog, DialogContent } from '@/shared/ui/common/dialog'
import { cn } from '@/shared/lib/classnames'
import type { ComponentProps } from 'react'
import type { ReactNode } from 'react'

interface RootProps extends ComponentProps<'div'> {
  open: boolean
  onOpenChange: (open: boolean) => void
  dismissible?: boolean
  children: ReactNode
}

export const Root = ({
  open,
  onOpenChange,
  dismissible = true,
  children,
  className,
  ...rest
}: RootProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'w-67.5 px-0 pb-0 pt-4 flex flex-col bg-usage-background-inverse border-none',
          !dismissible && '[&>button]:hidden',
          className,
        )}
        {...rest}
        onInteractOutside={(e) => {
          if (!dismissible) e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          if (!dismissible) e.preventDefault()
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
