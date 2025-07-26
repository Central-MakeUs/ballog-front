import { useState } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  skeletonClassName?: string
}

/* 배경색 디자인 토큰이 없어서 임시로 색상 지정 */
export const LazyImage = ({
  src,
  alt,
  className = '',
  skeletonClassName = 'bg-[#252525] animate-pulse rounded-lg',
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && <div className={`absolute inset-0 ${skeletonClassName}`} />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        onLoad={handleImageLoad}
      />
    </div>
  )
}
