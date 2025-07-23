import type { ComponentProps } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/classnames'

interface FooterProps extends ComponentProps<'div'> {
  children: ReactNode
}

export const Footer = ({ children, className, ...rest }: FooterProps) => (
  <div
    className={cn(
      'text-center py-3 body-sm-medium border-t border-usage-background-strong text-usage-text-default',
      className,
    )}
    {...rest}
  >
    {children}
  </div>
)
