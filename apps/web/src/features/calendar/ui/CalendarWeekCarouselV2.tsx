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
    slots,
    dragX,
    isDragging,
    transition,
    pointerHandlers,
    onTransitionEnd,
    onKeyDown,
  } = useWeekCarousel({ baseDate, onBaseDateChange: onChange })

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      className="relative w-full overflow-hidden outline-none select-none"
      style={{ touchAction: 'pan-y' }}
      {...pointerHandlers}
      onKeyDown={onKeyDown}
    >
      {slots.map((slot, i) => (
        <div
          key={i}
          className={cn(
            'left-0 top-0 w-full',
            slot.isCenter ? 'relative' : 'absolute',
          )}
          style={{
            transform: `translate3d(calc(${slot.offsetIndex * 100}% + ${dragX}px), 0, 0)`,
            transition,
            willChange: 'transform',
          }}
          onTransitionEnd={slot.isCenter ? onTransitionEnd : undefined}
        >
          <CalendarWeekContent
            allMatches={allMatches}
            date={slot.date}
            selectedDate={selectedDate}
            onSelect={(d) => {
              if (isDragging) return
              onSelect(d)
              onChange(d)
            }}
          />
        </div>
      ))}
    </div>
  )
}
