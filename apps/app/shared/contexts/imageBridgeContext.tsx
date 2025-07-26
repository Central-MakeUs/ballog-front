import { createContext, useContext, useState, useCallback } from 'react'

interface ImageBridgeContextValue {
  base64Image: string | null
  setBase64Image: (image: string) => void
  clearBase64Image: () => void
}

const ImageBridgeContext = createContext<ImageBridgeContextValue | undefined>(undefined)

export const ImageBridgeProvider = ({ children }: { children: React.ReactNode }) => {
  const [base64Image, setBase64] = useState<string | null>(null)

  const setBase64Image = useCallback((image: string) => {
    setBase64(image)
  }, [])

  const clearBase64Image = useCallback(() => {
    setBase64(null)
  }, [])

  return (
    <ImageBridgeContext.Provider
      value={{ base64Image, setBase64Image, clearBase64Image }}
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
