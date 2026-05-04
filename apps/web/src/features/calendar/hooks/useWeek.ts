import { useCallback, useMemo, useRef } from 'react'
import { addDays, differenceInWeeks, startOfWeek } from 'date-fns'

const SLOT_COUNT = 5
const CENTER_OFFSET = 2

const weekStart = (d: Date) => startOfWeek(d, { weekStartsOn: 0 })

export interface UseWeekOptions {
  baseDate: Date
  onBaseDateChange: (newBaseDate: Date) => void
  maxWeeksRange?: number
}

export const useWeek = ({
  baseDate,
  onBaseDateChange,
  maxWeeksRange = 104,
}: UseWeekOptions) => {
  const initialBaseRef = useRef(weekStart(baseDate))

  const baseWeek = useMemo(() => weekStart(baseDate), [baseDate])

  const slots = useMemo(
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

  return {
    slots,
    centerOffset: CENTER_OFFSET,
    canGoPrev,
    canGoNext,
    goPrev,
    goNext,
  }
}
