import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import GameCard from '../../../components/gameCard'
import type { CarouselApi } from '@/components/ui/carousel'

const GameCardCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)
  const slides = Array.from({ length: 5 })

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
    <>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          <div
            className="pointer-events-none shrink-0 grow-0 min-w-[calc(50%-135px)]"
            aria-hidden="true"
          />

          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="min-w-[270px] max-w-[270px] shrink-0"
            >
              <GameCard
                homeTeam="롯데"
                awayTeam="KT"
                stadium="사직"
                date="2025.06.27"
                thumbnail='이미지URL'
              />
            </CarouselItem>
          ))}
          <div
            className="pointer-events-none shrink-0 grow-0 min-w-[calc(50%-135px)]"
            aria-hidden="true"
          />
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center mt-2 gap-1">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1.75 w-6.5 ${
              index === current ? 'bg-gray-700' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </>
  )
}

export default GameCardCarousel
