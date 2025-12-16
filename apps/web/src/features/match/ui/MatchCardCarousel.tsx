import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shared/ui/common/carousel'
import type { CarouselApi } from '@/shared/ui/common/carousel'
import type { Match } from '@/entities/match/model/match.type'
import { useFlow } from '@/app/routes/stackflow'
import { useSortMatchByBaseBallTeam } from '@/features/match/hooks/useSortMatchByBaseBallTeam'

import { MatchCardFactory } from './MatchCardFactory'

interface MatchCardCarouselProps {
  matches: Match[]
}

export const MatchCardCarousel = ({ matches }: MatchCardCarouselProps) => {
  const { push } = useFlow()
  const sortedMatches = useSortMatchByBaseBallTeam(matches)

  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    // 바로 1번째 아이템으로 이동시킴
    api.scrollTo(1, true)

    const onSelect = () => {
      const index = api.selectedScrollSnap()
      const lastIndex = api.scrollSnapList().length - 2 // 더미 바로 전 인덱스
      const realIndex = Math.min(Math.max(index, 1), lastIndex) // 앞, 뒤 더미 자른 값

      if (index === 0) {
        api.scrollTo(1, false)
      }

      if (index > lastIndex) {
        api.scrollTo(lastIndex, false)
      }

      // 양쪽 더미 하나씩 있으니까 -1 보정
      setCurrent(Math.max(0, Math.min(matches.length - 1, realIndex - 1)))
    }

    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api, matches.length])
  
  return (
    <div className="pt-6 w-full">
      <Carousel
        className="w-full justify-center items-center"
        setApi={setApi}
        opts={{ loop: false, align: 'center' }}
      >
        <CarouselContent className="-ml-6">
          {/* 더미 아이템 */}
          <div
            className="basis-3/5 pl-6 shrink-0 pointer-events-none"
            aria-hidden="true"
          />

          {sortedMatches.map((match, index) => (
            <CarouselItem key={index} className="basis-3/5 pl-6">
              <MatchCardFactory
                match={match}
                isCenter={index === current}
                onClick={() =>
                  push(
                    'LiveRecord',
                    { matchId: String(match.matchesId) },
                    {
                      animate: false,
                    },
                  )
                }
              />
            </CarouselItem>
          ))}
          <div
            className="basis-3/5 pl-6 shrink-0 pointer-events-none"
            aria-hidden="true"
          />
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
