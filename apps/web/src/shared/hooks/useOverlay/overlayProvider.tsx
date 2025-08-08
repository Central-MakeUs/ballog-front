import React, {
  type JSX,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react'
import { findLastIndex } from 'remeda'

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

  const setOverlay = useCallback((overlay: Overlay) => {
    setOverlays((prev) => [...prev, overlay])
  }, [])

  const popOverlay = useCallback((overlayId?: string) => {
    if (typeof overlayId === 'string') {
      setOverlays((prev) => {
        const newOverlays = [...prev]
        const index = findLastIndex(
          newOverlays,
          (overlay: Overlay) => overlay.overlayId === overlayId,
        )
        if (index !== -1) {
          newOverlays.splice(index, 1)
        }
        return newOverlays
      })
    } else {
      setOverlays((prev) => prev.slice(0, -1))
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
