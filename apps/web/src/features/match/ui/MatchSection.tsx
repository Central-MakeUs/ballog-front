import type { Match } from '@/entities/match/model/match.type'
import { SectionHeader } from '@/entities/match/ui/SectionHeader'

import { MatchCardCarousel } from './MatchCardCarousel'

interface MatchSectionProps {
  matches: Match[]
}

export const MatchSection = ({ matches }: MatchSectionProps) => {
  return (
    <div className="flex flex-col items-center w-full pb-20">
      <SectionHeader
        title={['오늘의 경기를 선택하고', '감정을 기록해보세요']}
      />
      <MatchCardCarousel matches={matches} />
    </div>
  )
}
