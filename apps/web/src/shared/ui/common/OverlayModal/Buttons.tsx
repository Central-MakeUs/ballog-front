import { cn } from '@/shared/lib/classnames'
import type { ComponentProps } from 'react'

interface ModalButton {
  label: string
  onClick: () => void
}

interface ButtonsProps extends ComponentProps<'div'> {
  buttons: ModalButton[]
  layout: 'horizontal' | 'vertical'
}

export const Buttons = ({
  buttons,
  layout,
  className,
  ...rest
}: ButtonsProps) => {
  if (!buttons || buttons.length === 0) return null

  if (layout === 'horizontal') {
    return (
      <div
        className={cn(
          'flex divide-x-[0.333px]  border-brand-neutral-50 w-full',
          className,
        )}
        {...rest}
      >
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={cn(
              'flex-1 py-2.5 text-center',
              idx === buttons.length - 1 ? 'body-md-bold' : 'body-md-medium',
              'text-brand-primary-pressed',
              'border-t-[0.333px] solid border-brand-neutral-50',
            )}
          >
            {btn.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col divide-y-[0.333px] border-brand-neutral-50 w-full',
        className,
      )}
      {...rest}
    >
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className={cn(
            'w-full py-2.5 text-center body-md-medium',
            idx < buttons.length - 1
              ? 'text-brand-neutral-70'
              : 'text-brand-primary-pressed',
          )}
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}
