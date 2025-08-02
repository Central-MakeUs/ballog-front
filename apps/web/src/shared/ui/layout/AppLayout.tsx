import React from 'react'

import { cn } from '@/shared/lib/classnames'

export const AppLayout = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <>
      <div
        className={cn(
          'flex flex-col items-center w-full pb-25 bg-usage-background-default',
          className,
        )}
      >
        {children}
      </div>
    </>
  )
}
