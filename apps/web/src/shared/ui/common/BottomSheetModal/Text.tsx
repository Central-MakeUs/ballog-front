import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

interface TextProps extends ComponentProps<'div'> {
  heading: string
  body?: string
}

export const Text = ({ heading, body, className, ...rest }: TextProps) => {
  return (
    <div
      className={cn(
        'flex flex-col space-y-3 text-center items-center',
        'text-usage-text-default',
        className,
      )}
      {...rest}
    >
      <div className="body-lg-bold">{heading}</div>
      {body && (
        <div className={cn('body-sm-medium pb-6', 'text-usage-text-subtle')}>
          {body}
        </div>
      )}
    </div>
  )
}
