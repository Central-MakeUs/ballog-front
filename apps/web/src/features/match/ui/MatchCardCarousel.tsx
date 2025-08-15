import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shared/ui/common/carousel'
import type { CarouselApi } from '@/shared/ui/common/carousel'
import { MatchCard } from '@/entities/match/ui/MatchCard'
import type { Match } from '@/entities/match/model/match.type'
import { useFlow } from '@/shared/lib/stackflow'

interface MatchCardCarouselProps {
  matches: Match[]
}

export const MatchCardCarousel = ({ matches }: MatchCardCarouselProps) => {
  const { replace } = useFlow()

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
      <Carousel
        className="w-full justify-center items-center"
        setApi={setApi}
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-6">
          {matches.map((match, index) => (
            <CarouselItem key={index} className="basis-3/5 pl-6">
              <MatchCard
                {...match}
                isCenter={index === current}
                onClick={() =>
                  replace('LiveRecord', { matchId: String(match.matchesId) })
                }
              />
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
              index === current
                ? 'bg-brand-neutral-white'
                : 'bg-brand-neutral-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
