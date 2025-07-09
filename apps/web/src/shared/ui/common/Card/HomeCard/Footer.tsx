import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'
import type { ReactNode } from 'react'

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
