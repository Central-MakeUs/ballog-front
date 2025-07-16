import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shared/ui/common/carousel'
import type { CarouselApi } from '@/shared/ui/common/carousel'
import { MatchCard } from '@/entities/match/ui/MatchCard'
import type { Match } from '@/entities/match/model/match.type'

interface MatchCardCarouselProps {
  matches: Match[]
}

export const MatchCardCarousel = ({ matches }: MatchCardCarouselProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className="pt-6 w-full">
      <Carousel className="w-full justify-center items-center" setApi={setApi}>
        <CarouselContent>
          <div
            className="pointer-events-none shrink-0 grow-0"
            aria-hidden="true"
          />

          {matches.map((match, index) => (
            <CarouselItem key={index} className="flex justify-center shrink-0">
              <MatchCard {...match} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2 p-1 bg-usage-background-strong rounded-full w-fit mx-auto">
        {matches.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === current ? 'bg-brand-neutral-70' : 'bg-brand-neutral-30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
