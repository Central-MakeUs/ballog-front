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
  return (
    <div className={cn('flex gap-4 w-full ', className)} {...rest}>
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className={cn(
            'body-md-medium flex-1 py-3 rounded-xl',
            idx === 0
              ? 'bg-brand-secondary-subtle text-brand-neutral-70'
              : 'bg-brand-primary-default text-brand-neutral-white',
          )}
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}
