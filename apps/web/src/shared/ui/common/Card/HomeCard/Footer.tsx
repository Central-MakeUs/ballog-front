import type { ComponentProps } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/classnames'

interface FooterProps extends ComponentProps<'div'> {
  children?: ReactNode
}

export const Footer = ({ children, className, ...rest }: FooterProps) => {
  return (
    <div className={cn('pb-4', className)} {...rest}>
      {children}
    </div>
  )
}
