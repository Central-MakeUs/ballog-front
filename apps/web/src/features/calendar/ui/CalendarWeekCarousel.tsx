import { useEffect, useMemo, useState } from 'react'
import { addDays, startOfWeek, differenceInWeeks } from 'date-fns'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/ui/common/carousel'

import { CalendarWeekContent } from './CalendarWeekContent'

interface CalendarWeekCarouselProps {
  baseDate: Date
  onChange: (date: Date) => void
  selectedDate: Date | null
  onSelect: (d: Date) => void
}

const TOTAL_WEEKS = 208
const CENTER = Math.floor(TOTAL_WEEKS / 2)
const weekStart = (d: Date) => startOfWeek(d, { weekStartsOn: 0 })

export const CalendarWeekCarousel = ({
  baseDate,
  onChange,
  selectedDate,
  onSelect,
}: CalendarWeekCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>()

  const weeks = useMemo(() => {
    const todayWeek = weekStart(new Date())
    return Array.from({ length: 208 }, (_, i) =>
      addDays(todayWeek, (i - 104) * 7),
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
      const newBaseDate = weeks[idx]
      if (newBaseDate) {
        // onChange(newBaseDate)
      }
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
        {weeks.map((weekDate) => (
          <CarouselItem key={weekDate.toISOString()} className="basis-full">
            <CalendarWeekContent
              date={weekDate}
              selectedDate={selectedDate}
              onSelect={(d) => {
                onSelect(d)
                onChange(d)
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
