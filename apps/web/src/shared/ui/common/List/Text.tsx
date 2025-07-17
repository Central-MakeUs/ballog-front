import { cn } from '@/shared/lib/classnames'
import type { ComponentProps } from 'react'

interface TextProps extends ComponentProps<'span'> {
  className?: string
}

export const Text = ({ children, className, ...props }: TextProps) => (
  <span className={cn('text-brand-neutral-white body-sm-medium', className)} {...props}>
    {children}
  </span>
)
