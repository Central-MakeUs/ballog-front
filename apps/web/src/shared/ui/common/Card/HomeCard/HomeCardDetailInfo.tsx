import React from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'

interface HomeCardDetailInfoProps extends ComponentProps<'div'> {
  stadium?: string
  dateTime?: string
  children?: React.ReactNode
}

export const HomeCardDetailInfo = ({
  stadium = '잠실 경기장',
  dateTime = '2025.06.18 17:30',
  className,
  children,
  ...rest
}: HomeCardDetailInfoProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start justify-start p-0 relative shrink-0 w-full',
        'bg-brand-neutral-10 pt-4 pb-6',
        'rounded-b-lg',
        className,
      )}
      data-name="text-wrapper"
      {...rest}
    >
      <div
        className="flex flex-col gap-2 items-center justify-center p-0 relative shrink-0 w-full"
        data-name="text-group"
      >
        <div
          className="flex flex-col gap-2.5 items-start justify-start p-0 relative rounded-lg shrink-0"
          data-name="text"
        >
          <div className="body-sm-medium text-brand-neutral-90 text-center w-full">
            {stadium}
          </div>
        </div>
        <div
          className="flex flex-col gap-2.5 items-start justify-start p-0 relative rounded-lg shrink-0"
          data-name="text"
        >
          <div className="body-sm-light text-brand-neutral-90 text-center w-full">
            {dateTime}
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}
