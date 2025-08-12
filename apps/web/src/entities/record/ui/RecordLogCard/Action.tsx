import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/shared/lib/classnames'
import RightArrow from '@/assets/rightArrow.svg?react'
import { Button } from '@/shared/ui/common'

interface ActionProps extends ComponentProps<'button'> {
  children?: ReactNode
}

export const Action = ({ children, className, ...rest }: ActionProps) => (
  <Button
    aria-label={typeof children === 'string' ? children : '자세히 보기'}
    variant="secondary"
    size="icon"
    className={cn(
      // absolute right-6, vertically centered
      'absolute right-6 top-1/2 -translate-y-1/2',
      // size and layout
      'h-8 px-2 flex items-center justify-center gap-1 rounded-large',
      // colors (Tailwind tokens)
      'bg-brand-secondary-default text-brand-neutral-white',
      className,
    )}
    {...rest}
  >
    {/* icon only visible; children kept for a11y via aria-label */}
    <RightArrow className="w-5 h-5" />
  </Button>
)
