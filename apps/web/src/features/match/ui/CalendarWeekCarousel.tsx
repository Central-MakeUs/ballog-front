import { useState, useEffect } from 'react'
import { addDays } from 'date-fns'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/ui/common/carousel'

import { CalendarWeekHeader } from './CalendarWeekHeader'

export function CalendarWeekCarousel() {
  const [baseDate, setBaseDate] = useState(new Date())
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    const handler = () => {
      const idx = api.selectedScrollSnap()
      if (idx === 0) {
        setBaseDate((prev) => addDays(prev, -7))
      } else if (idx === 2) {
        setBaseDate((prev) => addDays(prev, 7))
      }

      setTimeout(() => {
        api.scrollTo(1, true)
      }, 100)
    }

    api.on('select', handler)
    return () => {
      api.off('select', handler)
    }
  }, [api])

  return (
    <Carousel opts={{ align: 'center', loop: false }} setApi={setApi}>
      <CarouselContent>
        <CarouselItem className="basis-full">
          <CalendarWeekHeader
            date={addDays(baseDate, -7)}
            selectedDate={null}
            onSelect={() => {}}
          />
        </CarouselItem>
        <CarouselItem className="basis-full">
          <CalendarWeekHeader
            date={baseDate}
            selectedDate={null}
            onSelect={() => {}}
          />
        </CarouselItem>
        <CarouselItem className="basis-full">
          <CalendarWeekHeader
            date={addDays(baseDate, 7)}
            selectedDate={null}
            onSelect={() => {}}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
