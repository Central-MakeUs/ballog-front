import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/classnames'
import RightArrow from '@/assets/rightArrow.svg?react'

interface ArrowProps extends ComponentProps<'button'> {
  className?: string
}

export const Arrow = ({ className, ...props }: ArrowProps) => (
  <button
    type="button"
    className={cn('inline-flex items-center justify-center', className)}
    {...props}
  >
    <RightArrow className={cn('size-6 shrink-0')} />
  </button>
)
