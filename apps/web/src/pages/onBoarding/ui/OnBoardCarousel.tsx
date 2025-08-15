import { useState, useEffect } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/ui/common'
import { OnBoardingData } from '@/pages/onBoarding/constants/OnBoardingData'

import { OnBoardSlide } from './OnBoardSlide'

export const OnBoardingCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState<number>(0)

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
    <div>
      <Carousel className="w-full" setApi={setApi} opts={{ loop: false }}>
        <CarouselContent>
          {OnBoardingData.map((data) => (
            <CarouselItem
              key={data.id}
              className="h-full flex items-center justify-center"
            >
              <OnBoardSlide
                image={data.image}
                title={data.title}
                subTitle={data.subTitle}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center mt-6 gap-2 p-1 bg-usage-background-strong rounded-full w-fit mx-auto">
        {OnBoardingData.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === current ? 'bg-brand-neutral-white' : 'bg-brand-neutral-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
