import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

interface ImageProps extends ComponentProps<'div'> {
  imgSrc: string
}

export const Image = ({ imgSrc, className, ...rest }: ImageProps) => {
  return (
    <div className={cn('mx-auto w-30.75 h-30.75 mt-4', className)} {...rest}>
      <img src={imgSrc} alt="모달 이미지" className="w-full h-full" />
    </div>
  )
}
