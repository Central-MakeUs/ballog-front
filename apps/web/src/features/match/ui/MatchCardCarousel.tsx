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
  isActive?: boolean
}

export const MatchCardCarousel = ({
  matches,
  isActive,
}: MatchCardCarouselProps) => {
  const { push } = useFlow()

  const sortedMatches = useSortMatchByBaseBallTeam(matches)

  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)

  const handleMatchClick = (match: Match) => {
    push('LiveRecord', { matchId: String(match.matchesId) }, { animate: false })
  }

  // 마운트 시 캐러셀 초기화 함수
  const initCarousel = (
    api: CarouselApi,
    matchesLength: number,
    setCurrent: (n: number) => void,
  ) => {
    if (!api) return () => {}

    const isSnapReady = () => {
      const snapList = api.scrollSnapList()
      if (snapList.length >= 3) api.scrollTo(1, true)
      else requestAnimationFrame(isSnapReady)
    }
    isSnapReady()

    const handleSnapChange = () => {
      const index = api.selectedScrollSnap()
      const snapList = api.scrollSnapList()
      if (snapList.length < 3) return

      const lastIndex = snapList.length - 2
      const realIndex = Math.min(Math.max(index, 1), lastIndex)

      if (index === 0) api.scrollTo(1, false)
      if (index > lastIndex) api.scrollTo(lastIndex, false)

      setCurrent(Math.max(0, Math.min(matchesLength - 1, realIndex - 1)))
    }

    api.on('select', handleSnapChange)
    handleSnapChange()

    return () => api.off('select', handleSnapChange)
  }

  useEffect(() => {
    if (!api || !isActive) return
    return initCarousel(api, matches.length, setCurrent)
  }, [api, matches.length, isActive])

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
                onClick={() => handleMatchClick(match)}
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
