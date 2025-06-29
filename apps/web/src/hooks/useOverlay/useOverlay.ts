import { type JSX, useCallback, useEffect, useMemo, useState } from 'react'
import { useOverlayContext } from './overlayProvider'

let elementId = 0

export type CreateOverlayElement = (props: {
  isOpen: boolean
  close: () => void
  exit: () => void
}) => JSX.Element

/**
 * 사용 전, OverlayProvider 컴포넌트로 감싸주세요.
 *
 * <OverlayProvider>
 *  <App />
 * </OverlayProvider>
 *
 * overlay.open으로 원하는 컴포넌트를 오버레이 열기가 가능합니다.
 *
 * overlay.open(({isOpen, close, exit}) => {
 *  return <Modal />;
 * });
 *
 * 명시적으로 오버레이를 열 수 있습니다.
 *
 * overlay.close로 열려있는 오버레이 닫음
 */
export const useOverlay = () => {
  const { setOverlay, popOverlay, clearAllOverlays } = useOverlayContext()
  const [_, setIsOpen] = useState(false)
  const [id] = useState(() => String(elementId++))

  const close = useCallback(() => {
    setIsOpen(false)
    popOverlay(id)
  }, [id, popOverlay])

  const exit = useCallback(() => {
    clearAllOverlays()
    setIsOpen(false)
  }, [clearAllOverlays])

  useEffect(() => {
    return () => {
      clearAllOverlays()
    }
  }, [clearAllOverlays])

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        setIsOpen(true)
        setOverlay({
          overlayElement: overlayElement({
            isOpen: true,
            close,
            exit,
          }),
          overlayId: id,
        })
      },
      close,
      exit,
    }),
    [popOverlay, clearAllOverlays, setOverlay],
  )
}
