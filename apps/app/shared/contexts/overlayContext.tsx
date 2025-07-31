import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react'

type OverlayType = 'camera' | 'photoResult' | null

interface OverlayContextType {
  overlay: OverlayType
  openOverlay: (target: Exclude<OverlayType, null>) => void
  closeOverlay: () => void
}

const OverlayContext = createContext<OverlayContextType | null>(null)

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [overlay, setOverlay] = useState<OverlayType>(null)

  const openOverlay = useCallback((target: Exclude<OverlayType, null>) => {
    setOverlay(target)
  }, [])

  const closeOverlay = useCallback(() => {
    setOverlay(null)
  }, [])

  return (
    <OverlayContext.Provider value={{ overlay, openOverlay, closeOverlay }}>
      {children}
    </OverlayContext.Provider>
  )
}

export const useOverlay = (): OverlayContextType => {
  const context = useContext(OverlayContext)
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider')
  }
  return context
}
