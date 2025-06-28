import {
  type JSX,
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react'

interface Overlay {
  overlayElement: JSX.Element | null
  overlayId: string | null
}

interface OverlayState {
  overlays: Overlay[]
  setOverlay: (overlay: Overlay) => void
  popOverlay: (overlayId?: string) => void
  clearAllOverlays: () => void
}

export const OverlayContext = createContext<OverlayState | null>(null)

export const OverlayProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [overlays, setOverlays] = useState<Overlay[]>([])
  const overlayMapRef = useRef<Map<string, Overlay>>(new Map())

  const setOverlay = useCallback((overlay: Overlay) => {
    setOverlays((prev) => [...prev, overlay])
  }, [])

  const popOverlay = useCallback((overlayId?: string) => {
    if (typeof overlayId === 'string') {
      // Map에서 삭제
      overlayMapRef.current.delete(overlayId)
      setOverlays(Array.from(overlayMapRef.current.values()))
    } else {
      const lastOverlay = overlays[overlays.length - 1]
      if (lastOverlay && lastOverlay.overlayId) {
        overlayMapRef.current.delete(lastOverlay.overlayId)
        setOverlays(overlays.slice(0, -1))
      }
    }
  }, [])

  const clearAllOverlays = useCallback(() => {
    setOverlays([])
  }, [])

  const state: OverlayState = {
    overlays,
    setOverlay,
    popOverlay,
    clearAllOverlays,
  }

  return (
    <OverlayContext.Provider value={state}>
      {overlays.map((overlay) => overlay.overlayElement)}
      {children}
    </OverlayContext.Provider>
  )
}

export const useOverlayContext = () => {
  const context = useContext(OverlayContext)
  if (!context) {
    throw new Error('useOverlay를 OverlayProvider 안에서 사용해주세요.')
  }
  return context
}
