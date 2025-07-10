import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

interface ModalButton {
  label: string
  onClick: () => void
}

interface ButtonsProps extends ComponentProps<'div'> {
  buttons: [ModalButton, ModalButton]
}

export const Buttons = ({ buttons, className, ...rest }: ButtonsProps) => {
  const [left, right] = buttons

  return (
    <div className={cn('flex gap-4 w-full ', className)} {...rest}>
      <button
        onClick={left.onClick}
        className={cn(
          'body-md-medium flex-1 py-3 rounded-xl',
          'bg-brand-secondary-subtle text-brand-neutral-70',
        )}
      >
        {left.label}
      </button>
      <button
        onClick={right.onClick}
        className={cn(
          'body-md-medium flex-1 py-3 rounded-xl',
          'bg-brand-primary-default text-brand-neutral-white',
        )}
      >
        {right.label}
      </button>
    </div>
  )
}
