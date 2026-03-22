import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/shared/lib/classnames'

interface PortalBottomSheetProps {
  open: boolean
  children: ReactNode
  onOutsideClick?: () => void
  onExited?: () => void
  overlayClassName?: string
  sheetClassName?: string
}

const ANIMATION_DURATION_MS = 300

export const PortalBottomSheet = ({
  open,
  children,
  onOutsideClick,
  onExited,
  overlayClassName,
  sheetClassName,
}: PortalBottomSheetProps) => {
  const [shouldRender, setShouldRender] = useState(open)
  const [isVisible, setIsVisible] = useState(false)
  const onExitedRef = useRef(onExited)

  useEffect(() => {
    onExitedRef.current = onExited
  }, [onExited])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (open) {
      setShouldRender(true)

      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true)
      })

      return () => {
        window.cancelAnimationFrame(frame)
      }
    }

    setIsVisible(false)

    const timeout = window.setTimeout(() => {
      setShouldRender(false)
      onExitedRef.current?.()
    }, ANIMATION_DURATION_MS)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [open])

  useEffect(() => {
    if (!shouldRender || typeof document === 'undefined') return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [shouldRender])

  if (!shouldRender || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[80]"
      onClick={() => {
        onOutsideClick?.()
      }}
    >
      <div
        className={cn(
          'absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out',
          isVisible ? 'opacity-100' : 'opacity-0',
          overlayClassName,
        )}
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[512px]">
        <div
          className={cn(
            'w-full transition-transform duration-300 ease-out',
            isVisible ? 'translate-y-0' : 'translate-y-full',
            sheetClassName,
          )}
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}
