import { useCallback, useMemo, useRef } from 'react'
import type { KeyboardEvent } from 'react'

import { useDragState, type SlideDirection } from './useDragState'
import { useWeek } from './useWeek'

export interface UseWeekCarouselOptions {
  baseDate: Date
  onBaseDateChange: (newBaseDate: Date) => void
  maxWeeksRange?: number
}

export interface WeekCarouselSlot {
  date: Date
  offsetIndex: number
  isCenter: boolean
}

export const useWeekCarousel = ({
  baseDate,
  onBaseDateChange,
  maxWeeksRange,
}: UseWeekCarouselOptions) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const {
    slots: rawSlots,
    centerOffset,
    canGoPrev,
    canGoNext,
    goPrev,
    goNext,
  } = useWeek({ baseDate, onBaseDateChange, maxWeeksRange })

  const canCommit = useCallback(
    (direction: SlideDirection) => (direction < 0 ? canGoPrev : canGoNext),
    [canGoPrev, canGoNext],
  )

  const onCommit = useCallback(
    (direction: SlideDirection) => {
      if (direction < 0) goPrev()
      else goNext()
    },
    [goPrev, goNext],
  )

  const {
    dragX,
    isDragging,
    transitionEnabled,
    transitionMs,
    pointerHandlers,
    onTransitionEnd,
  } = useDragState({ containerRef, canCommit, onCommit })

  const slots = useMemo<WeekCarouselSlot[]>(
    () =>
      rawSlots.map((date, i) => ({
        date,
        offsetIndex: i - centerOffset,
        isCenter: i === centerOffset,
      })),
    [rawSlots, centerOffset],
  )

  const transition = transitionEnabled
    ? `transform ${transitionMs}ms ease-out`
    : 'none'

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    },
    [goPrev, goNext],
  )

  return {
    containerRef,
    slots,
    dragX,
    isDragging,
    transition,
    pointerHandlers,
    onTransitionEnd,
    onKeyDown,
  }
}
