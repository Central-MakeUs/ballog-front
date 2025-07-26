import { useEffect, useState, type ReactNode } from 'react'

import { type Image } from '@/entities/record/model/record.type'

import { ImageContext } from './useImageContext'

export const ImageContextProvider = ({
  children,
  initialImages,
}: {
  children: ReactNode
  initialImages: Image[]
}) => {
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    setImages(initialImages)
  }, [initialImages])

  return (
    <ImageContext.Provider value={{ images, setImages }}>
      {children}
    </ImageContext.Provider>
  )
}
