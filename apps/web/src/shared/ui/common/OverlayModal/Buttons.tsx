import { cn } from '@/shared/lib/utils'
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
      <div className={cn('flex w-full', className)} {...rest}>
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={btn.onClick}
            className={cn(
              'flex-1 py-2.5 text-center',
              idx < buttons.length - 1 && 'border-r',
              idx === buttons.length - 1 ? 'body-md-bold' : 'body-md-medium',
            )}
            style={{
              borderTop: '0.333px solid var(--color-brand-neutral-50)',
              borderRight:
                idx < buttons.length - 1
                  ? '0.333px solid var(--color-brand-neutral-50)'
                  : undefined,
              color: 'var(--color-brand-primary-pressed)',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col w-full', className)} {...rest}>
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className="w-full py-2.5 text-center body-md-medium"
          style={{
            borderTop: '0.333px solid var(--color-brand-neutral-50)',
            color:
              idx === buttons.length - 1
                ? 'var(--color-brand-neutral-70)'
                : 'var(--color-brand-primary-pressed)',
          }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}
