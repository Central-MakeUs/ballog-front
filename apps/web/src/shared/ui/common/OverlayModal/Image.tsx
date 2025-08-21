import React, { type ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'

interface ImageProps extends ComponentProps<'div'> {
  imgSrc?: string
  children?: React.ReactNode
}

export const Image = ({ imgSrc, className, children, ...rest }: ImageProps) => {
  return (
    <div className={cn('mx-auto w-30.75 h-30.75 mt-4', className)} {...rest}>
      {children ? (
        children
      ) : (
        <img src={imgSrc} alt="모달 이미지" className="w-full h-full" />
      )}
    </div>
  )
}
