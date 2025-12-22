import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'
import { Button } from '@/shared/ui/common/Button'

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
      <Button
        onClick={left.onClick}
        variant="secondary"
        size="lg"
        className="flex-1"
      >
        {left.label}
      </Button>
      <Button
        onClick={right.onClick}
        variant="primary"
        size="lg"
        className="flex-1 light:text-brand-neutral-white"
      >
        {right.label}
      </Button>
    </div>
  )
}
