import { forwardRef, type ComponentProps, type ReactNode } from 'react'

import { cn } from '@/shared/lib/classnames'

interface ImageProps extends ComponentProps<'div'> {
  src: string
  alt?: string
  imgClassName?: string
  children?: ReactNode
  /** html-to-image용 CORS (S3 등에서 ACAO 열려 있어야 함) */
  crossOrigin?: 'anonymous' | 'use-credentials'
  fit?: 'cover' | 'contain'
}

export const Image = forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      src,
      alt = '모달 이미지',
      className,
      imgClassName,
      children,
      crossOrigin = 'anonymous',
      fit = 'cover',
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden', // 오버레이 얹기 위한 기준
          className,
        )}
        {...rest}
      >
        <img
          src={src}
          alt={alt}
          crossOrigin={crossOrigin}
          loading="lazy"
          className={cn(
            'w-full h-full',
            fit === 'cover' ? 'object-cover' : 'object-contain',
            imgClassName,
          )}
        />
        {children}
      </div>
    )
  },
)
Image.displayName = 'Image'
