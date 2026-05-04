import { useCallback, useRef, useState } from 'react'
import type { PointerEvent, RefObject, TransitionEvent } from 'react'

import { DragSession, type DragDirection } from '../lib/dragSession'

const SNAP_DISTANCE_RATIO = 0.3
const SNAP_VELOCITY_PX_PER_MS = 0.5
const TRANSITION_MS = 300

export type SlideDirection = DragDirection

export interface UseDragStateOptions {
  containerRef: RefObject<HTMLDivElement | null>
  canCommit: (direction: SlideDirection) => boolean
  onCommit: (direction: SlideDirection) => void
}

export const useDragState = ({
  containerRef,
  canCommit,
  onCommit,
}: UseDragStateOptions) => {
  const sessionRef = useRef<DragSession | null>(null)

  const [dragX, setDragX] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (transitionEnabled) return
      if (e.pointerType === 'mouse' && e.button !== 0) return

      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        // pointer capture may fail on some browsers; safe to ignore
      }

      sessionRef.current = new DragSession(e.clientX, e.timeStamp, e.pointerId)
      setTransitionEnabled(false)
    },
    [transitionEnabled],
  )

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const session = sessionRef.current
    if (!session) return

    if (session.update(e.clientX, e.timeStamp)) {
      setIsDragging(true)
    }
    setDragX(session.dx)
  }, [])

  const onPointerEnd = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const session = sessionRef.current
      if (!session) return
      sessionRef.current = null

      try {
        e.currentTarget.releasePointerCapture(session.pointerId)
      } catch {
        // ignore
      }

      const containerWidth = containerRef.current?.offsetWidth ?? 0
      const passedDistance =
        containerWidth > 0 &&
        Math.abs(session.dx) >= containerWidth * SNAP_DISTANCE_RATIO
      const passedVelocity =
        Math.abs(session.velocity) >= SNAP_VELOCITY_PX_PER_MS

      setIsDragging(false)
      setTransitionEnabled(true)

      const shouldCommit =
        (passedDistance || passedVelocity) &&
        !session.isClick() &&
        canCommit(session.direction)

      if (shouldCommit) {
        setDragX(session.direction === -1 ? containerWidth : -containerWidth)
      } else {
        setDragX(0)
      }
    },
    [canCommit, containerRef],
  )

  const onTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== 'transform') return
      if (!transitionEnabled) return

      const containerWidth = containerRef.current?.offsetWidth ?? 0

      if (containerWidth > 0 && Math.abs(dragX) >= containerWidth) {
        const direction: SlideDirection = dragX > 0 ? -1 : 1
        setTransitionEnabled(false)
        setDragX(0)
        onCommit(direction)
      } else {
        setTransitionEnabled(false)
      }
    },
    [transitionEnabled, dragX, containerRef, onCommit],
  )

  return {
    dragX,
    isDragging,
    transitionEnabled,
    transitionMs: TRANSITION_MS,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
    },
    onTransitionEnd,
  }
}
