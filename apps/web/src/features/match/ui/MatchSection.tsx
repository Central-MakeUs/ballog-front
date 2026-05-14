import type { Match } from '@/entities/match/model/match.type'
import { SectionHeader } from '@/entities/match/ui/SectionHeader'

import { MatchCardCarousel } from './MatchCardCarousel'

type DateType = 'past' | 'today' | 'future' | null

interface MatchSectionProps {
  matches: Match[]
  dateType: DateType
  isActive?: boolean
}

export const MatchSection = ({
  matches,
  dateType,
  isActive,
}: MatchSectionProps) => {
  const headerText = (() => {
    switch (dateType) {
      case 'past':
        return ['지난 경기 일정을', '확인해보세요']
      case 'future':
        return ['다가올 경기 일정을', '미리 확인해보세요']
      case 'today':
      default:
        return ['오늘의 경기를 선택하고', '감정을 기록해보세요']
    }
  })()

  return (
    <div className="flex flex-col items-center w-full pb-20">
      <SectionHeader title={headerText} />
      <MatchCardCarousel matches={matches} isActive={isActive} />
    </div>
  )
}
