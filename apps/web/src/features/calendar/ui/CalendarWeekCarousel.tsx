import { useEffect, useMemo, useState } from 'react'
import { addDays, startOfWeek, differenceInWeeks } from 'date-fns'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/ui/common/carousel'
import { cn } from '@/shared/lib/classnames'
import type { MatchDateMap } from '@/entities/match/model/match.type'

import { CalendarWeekContent } from './CalendarWeekContent'

interface CalendarWeekCarouselProps {
  allMatches: MatchDateMap
  baseDate: Date
  onChange: (date: Date) => void
  selectedDate: Date | null
  onSelect: (d: Date) => void
}

const TOTAL_WEEKS = 208
const CENTER = Math.floor(TOTAL_WEEKS / 2)
const weekStart = (d: Date) => startOfWeek(d, { weekStartsOn: 0 })
const VISIBLE_RANGE = 5

export const CalendarWeekCarousel = ({
  allMatches,
  baseDate,
  onChange,
  selectedDate,
  onSelect,
}: CalendarWeekCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>()

  const [currentIndex, setCurrentIndex] = useState(CENTER)

  const weeks = useMemo(() => {
    const todayWeek = weekStart(new Date())
    return Array.from({ length: TOTAL_WEEKS }, (_, i) =>
      addDays(todayWeek, (i - CENTER) * 7),
    )
  }, [])

  useEffect(() => {
    if (!api || !baseDate) return

    const todayWeek = weekStart(new Date())
    const targetWeek = weekStart(baseDate)

    const delta = differenceInWeeks(targetWeek, todayWeek)
    const targetIndex = CENTER + delta

    if (targetIndex >= 0 && targetIndex < TOTAL_WEEKS) {
      api.scrollTo(targetIndex, true)
    }
  }, [api, baseDate])

  useEffect(() => {
    if (!api) return

    const handler = () => {
      const idx = api.selectedScrollSnap()
      setCurrentIndex(idx)
    }

    api.on('select', handler)
    return () => {
      api.off('select', handler)
    }
  }, [api, weeks, onChange])

  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
        duration: 20,
      }}
      setApi={setApi}
    >
      <CarouselContent>
        {weeks.map((weekDate, idx) => {
          const isVisible = Math.abs(idx - currentIndex) <= VISIBLE_RANGE

          return (
            <CarouselItem
              key={weekDate.toISOString()}
              className={cn('basis-full', !isVisible && 'invisible')}
            >
              {isVisible && (
                <CalendarWeekContent
                  allMatches={allMatches}
                  date={weekDate}
                  selectedDate={selectedDate}
                  onSelect={(d) => {
                    onSelect(d)
                    onChange(d)
                  }}
                />
              )}
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
