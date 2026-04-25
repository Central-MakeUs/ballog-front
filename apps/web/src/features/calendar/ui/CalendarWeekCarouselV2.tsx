import type { KeyboardEvent } from 'react'

import { cn } from '@/shared/lib/classnames'
import type { MatchDateMap } from '@/entities/match/model/match.type'

import { useWeekCarousel } from '../hooks/useWeekCarousel'

import { CalendarWeekContent } from './CalendarWeekContent'

interface CalendarWeekCarouselV2Props {
  allMatches: MatchDateMap
  baseDate: Date
  onChange: (date: Date) => void
  selectedDate: Date | null
  onSelect: (d: Date) => void
}

export const CalendarWeekCarouselV2 = ({
  allMatches,
  baseDate,
  onChange,
  selectedDate,
  onSelect,
}: CalendarWeekCarouselV2Props) => {
  const {
    containerRef,
    slotsData,
    centerOffset,
    dragX,
    transitionEnabled,
    transitionMs,
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onTransitionEnd,
    goPrev,
    goNext,
  } = useWeekCarousel({
    baseDate,
    onBaseDateChange: onChange,
  })

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      goNext()
    }
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      className="relative w-full overflow-hidden select-none outline-none"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onKeyDown={handleKeyDown}
    >
      {slotsData.map((weekDate, i) => {
        const offsetPercent = (i - centerOffset) * 100
        const isCenter = i === centerOffset

        return (
          <div
            key={i}
            className={cn(
              'left-0 top-0 w-full',
              isCenter ? 'relative' : 'absolute',
            )}
            style={{
              transform: `translate3d(calc(${offsetPercent}% + ${dragX}px), 0, 0)`,
              transition: transitionEnabled
                ? `transform ${transitionMs}ms ease-out`
                : 'none',
              willChange: 'transform',
            }}
            onTransitionEnd={isCenter ? onTransitionEnd : undefined}
          >
            <CalendarWeekContent
              allMatches={allMatches}
              date={weekDate}
              selectedDate={selectedDate}
              onSelect={(d) => {
                if (isDragging) return
                onSelect(d)
                onChange(d)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
