import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'

interface DetailInfoProps extends ComponentProps<'div'> {
  stadium: string
  dateTime: string
}

export const DetailInfo = ({
  stadium,
  dateTime,
  className,
  ...rest
}: DetailInfoProps) => {
  return (
    <div
      className={cn(
        'w-full text-center pt-4 pb-4 bg-usage-background-inverses',
        className,
      )}
      {...rest}
    >
      <div className="mb-2 body-sm-medium">{stadium}</div>
      <div className="body-sm-light">{dateTime}</div>
    </div>
  )
}
