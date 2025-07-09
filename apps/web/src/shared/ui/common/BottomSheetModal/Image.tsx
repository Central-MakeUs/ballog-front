import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

interface ImageProps extends ComponentProps<'img'> {
  src: string
  alt?: string
}

export const Image = ({
  src,
  alt = '모달 이미지',
  className,
  ...rest
}: ImageProps) => {
  return (
    <div className={cn('mx-auto w-full max-h-134 mb-6', className)} {...rest}>
      <img
        src={src}
        alt={alt}
        className={cn('w-full h-auto max-h-134', className)}
        {...rest}
      />
    </div>
  )
}
