import { MatchTeamEmotionDistribution } from '@/entities/record/ui/MatchTeamEmotionDistribution'
import { useGetRecordDetail } from '@/features/record/hooks/useGetRecordDetail'

export const EmotionDistribution = ({
  matchRecordId,
}: {
  matchRecordId: number
}) => {
  const { isUserSupportingTeam, isDuringMatch, recordDetail } =
    useGetRecordDetail({
      matchRecordId: matchRecordId,
    })

  const { positiveEmotionPercent, negativeEmotionPercent, emotionGroupList } =
    recordDetail

  if (isDuringMatch) {
    return (
      <>
        <SectionContainer>
          <MatchTeamEmotionDistribution.Empty />
        </SectionContainer>
      </>
    )
  }

  if(!isDuringMatch && !isUserSupportingTeam) {
    return (
      <>
        <SectionContainer>
          <MatchTeamEmotionDistribution.ClickCount emotionGroupList={emotionGroupList} />
        </SectionContainer>
      </>
    )
  }

  return <></>
}

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full flex flex-col items-start justify-center px-4 pt-10 pb-4 gap-4">
        <span className="text-usage-text-default body-md-bold">
          경기 팀 감정분포
        </span>
        {children}
      </div>
    </>
  )
}
