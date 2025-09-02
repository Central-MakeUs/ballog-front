import { HomeCard } from '@/shared/ui/common/Card/HomeCard'
import { Button } from '@/shared/ui/common/Button'
import { SectionHeader } from '@/entities/match/ui/SectionHeader'
import { useFlow } from '@/app/routes/stackflow'

export const MatchEmptySection = () => {
  const { replace } = useFlow()
  return (
    <div className="flex flex-col items-center justify-start w-full pb-20">
      <SectionHeader title={['오늘 예정된', '경기가 없습니다']} />

      <div className="flex justify-center pt-8 px-23 w-full">
        <HomeCard.Disabled>
          <Button
            variant="secondary"
            className="body-md-medium rounded-lg py-3 w-full mt-4"
            onClick={() => replace('Record', {}, { animate: false })}
          >
            관람로그 보기
          </Button>
        </HomeCard.Disabled>
      </div>
    </div>
  )
}
