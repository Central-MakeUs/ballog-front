import { useCallback, useMemo, useRef, useState } from 'react'
import type { PointerEvent, TransitionEvent } from 'react'
import { addDays, differenceInWeeks, startOfWeek } from 'date-fns'

const SLOT_COUNT = 5
const CENTER_OFFSET = 2
const SNAP_DISTANCE_RATIO = 0.3
const SNAP_VELOCITY_PX_PER_MS = 0.5
const TRANSITION_MS = 200
const CLICK_THRESHOLD_PX = 5

const weekStart = (d: Date) => startOfWeek(d, { weekStartsOn: 0 })

export interface UseWeekCarouselOptions {
  baseDate: Date
  onBaseDateChange: (newBaseDate: Date) => void
  maxWeeksRange?: number
}

export const useWeekCarousel = ({
  baseDate,
  onBaseDateChange,
  maxWeeksRange = 104,
}: UseWeekCarouselOptions) => {
  const initialBaseRef = useRef(weekStart(baseDate))
  const containerRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<{
    startX: number
    startT: number
    lastX: number
    lastT: number
    pointerId: number
    moved: boolean
  } | null>(null)

  const [dragX, setDragX] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const baseWeek = useMemo(() => weekStart(baseDate), [baseDate])

  const slotsData = useMemo(
    () =>
      Array.from({ length: SLOT_COUNT }, (_, i) =>
        addDays(baseWeek, (i - CENTER_OFFSET) * 7),
      ),
    [baseWeek],
  )

  const weeksFromInitial = useMemo(
    () => differenceInWeeks(baseWeek, initialBaseRef.current),
    [baseWeek],
  )

  const canGoPrev = weeksFromInitial > -maxWeeksRange
  const canGoNext = weeksFromInitial < maxWeeksRange

  const goPrev = useCallback(() => {
    if (!canGoPrev) return
    onBaseDateChange(addDays(baseWeek, -7))
  }, [canGoPrev, baseWeek, onBaseDateChange])

  const goNext = useCallback(() => {
    if (!canGoNext) return
    onBaseDateChange(addDays(baseWeek, 7))
  }, [canGoNext, baseWeek, onBaseDateChange])

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (transitionEnabled) return
      if (e.pointerType === 'mouse' && e.button !== 0) return

      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        // pointer capture may fail on some browsers; safe to ignore
      }

      dragStateRef.current = {
        startX: e.clientX,
        startT: e.timeStamp,
        lastX: e.clientX,
        lastT: e.timeStamp,
        pointerId: e.pointerId,
        moved: false,
      }
      setTransitionEnabled(false)
    },
    [transitionEnabled],
  )

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current
    if (!state) return

    const dx = e.clientX - state.startX
    state.lastX = e.clientX
    state.lastT = e.timeStamp

    if (!state.moved && Math.abs(dx) > CLICK_THRESHOLD_PX) {
      state.moved = true
      setIsDragging(true)
    }

    setDragX(dx)
  }, [])

  const onPointerEnd = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const state = dragStateRef.current
      if (!state) return
      dragStateRef.current = null

      try {
        e.currentTarget.releasePointerCapture(state.pointerId)
      } catch {
        // ignore
      }

      const containerWidth = containerRef.current?.offsetWidth ?? 0
      const dx = state.lastX - state.startX
      const dt = Math.max(state.lastT - state.startT, 1)
      const velocity = dx / dt

      const direction = dx > 0 ? -1 : 1
      const passedDistance =
        containerWidth > 0 && Math.abs(dx) >= containerWidth * SNAP_DISTANCE_RATIO
      const passedVelocity = Math.abs(velocity) >= SNAP_VELOCITY_PX_PER_MS
      const canMove = direction < 0 ? canGoPrev : canGoNext

      setIsDragging(false)
      setTransitionEnabled(true)

      const shouldCommit =
        (passedDistance || passedVelocity) &&
        Math.abs(dx) > CLICK_THRESHOLD_PX &&
        canMove

      if (shouldCommit) {
        setDragX(direction === -1 ? containerWidth : -containerWidth)
      } else {
        setDragX(0)
      }
    },
    [canGoPrev, canGoNext],
  )

  const onTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== 'transform') return
      if (!transitionEnabled) return

      const containerWidth = containerRef.current?.offsetWidth ?? 0

      if (containerWidth > 0 && Math.abs(dragX) >= containerWidth) {
        const direction = dragX > 0 ? -1 : 1
        const newBase = addDays(baseWeek, direction * 7)
        setTransitionEnabled(false)
        setDragX(0)
        onBaseDateChange(newBase)
      } else {
        setTransitionEnabled(false)
      }
    },
    [transitionEnabled, dragX, baseWeek, onBaseDateChange],
  )

  return {
    containerRef,
    slotsData,
    centerOffset: CENTER_OFFSET,
    dragX,
    transitionEnabled,
    transitionMs: TRANSITION_MS,
    isDragging,
    canGoPrev,
    canGoNext,
    goPrev,
    goNext,
    onPointerDown,
    onPointerMove,
    onPointerUp: onPointerEnd,
    onPointerCancel: onPointerEnd,
    onTransitionEnd,
  }
}
