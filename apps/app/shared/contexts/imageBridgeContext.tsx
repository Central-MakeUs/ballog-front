import { createContext, useContext, useState, useCallback } from 'react'
import type { ImageData } from '@ballog/bridge/types'
import type { PropsWithChildren } from 'react'

interface ImageBridgeContextValue {
  imageData: ImageData | null
  setImageData: (image: ImageData) => void
  clearImageData: () => void
}

const ImageBridgeContext = createContext<ImageBridgeContextValue | undefined>(
  undefined,
)

export const ImageBridgeProvider = ({ children }: PropsWithChildren) => {
  const [imageData, setImage] = useState<ImageData | null>(null)

  const setImageData = useCallback((data: ImageData) => {
    setImage(data)
  }, [])

  const clearImageData = useCallback(() => {
    setImage(null)
  }, [])

  return (
    <ImageBridgeContext.Provider
      value={{ imageData, setImageData, clearImageData }}
    >
      {children}
    </ImageBridgeContext.Provider>
  )
}

export const useImageBridge = () => {
  const context = useContext(ImageBridgeContext)
  if (!context) {
    throw new Error('useImageBridge must be used within an ImageBridgeProvider')
  }
  return context
}
