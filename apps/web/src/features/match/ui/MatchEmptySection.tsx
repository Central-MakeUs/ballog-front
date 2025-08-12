import { HomeCard } from '@/shared/ui/common/Card/HomeCard'
import { Button } from '@/shared/ui/common/Button'
import { SectionHeader } from '@/entities/match/ui/SectionHeader'
import { useFlow } from '@/shared/lib/stackflow'

export const MatchEmptySection = () => {
  const { replace } = useFlow()
  return (
    <div className="flex flex-col items-center justify-start w-full pb-20">
      <SectionHeader
        title={['오늘 예정된', '경기가 없습니다']}
        subtitle={['다음 직관을 기대하며,', '지난 직관 기록을 돌아볼까요?']}
      />

      {/* 하단 disabled 카드 */}
      <div className="flex justify-center pt-6 px-20 w-full">
        <HomeCard.Disabled>
          <Button
            variant="primary"
            size="sm"
            className="bg-brand-primary-default text-white"
            onClick={() => replace('Record', {}, { animate: false })}
          >
            직관로그 가기
          </Button>
        </HomeCard.Disabled>
      </div>
    </div>
  )
}
