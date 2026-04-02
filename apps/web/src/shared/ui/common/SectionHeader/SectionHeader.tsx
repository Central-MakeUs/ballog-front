import React from 'react'

import { cn } from '@/shared/lib/classnames'

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  rightContent?: React.ReactNode
  titleClassName?: string
}

export const SectionHeader = ({
  title,
  rightContent,
  titleClassName,
  className,
  ...props
}: SectionHeaderProps) => {
  return (
    <div
      {...props} // className이 제외된 나머지 props만 전달
      className={cn('flex justify-between items-center', className)}
    >
      <div
        className={cn('body-sm-bold text-[#212121]', titleClassName)}
      >
        {title}
      </div>
      {rightContent}
    </div>
  )
}
