import type { Match } from '@/entities/match/model/match.type'
import { MatchCardCarousel } from './MatchCardCarousel'
import { SectionHeader } from '../../../entities/match/ui/SectionHeader'

interface MatchSectionProps {
  matches: Match[]
}

export const MatchSection = ({ matches }: MatchSectionProps) => {
  return (
    <div className="flex flex-col items-center w-full pb-20">
      <SectionHeader
        title={['오늘의 경기 선택하고', '감정 기록하기']}
        subtitle={[
          '아래에서 오늘의 경기 중 하나를 선택하고',
          '실시간으로 감정을 기록해보세요.',
        ]}
      />
      <MatchCardCarousel matches={matches} />
    </div>
  )
}
