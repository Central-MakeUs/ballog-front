import { createContext, useContext } from 'react'

import { type Image } from '@/entities/record/model/record.type'

export const ImageContext = createContext<{
  images: Image[]
  setImages: (images: Image[]) => void
}>({
  images: [],
  setImages: () => {},
})

export const useImageContext = () => {
  const context = useContext(ImageContext)

  if (!context) {
    throw new Error('useImageContext must be used within ImageContextProvider')
  }

  return context
}
