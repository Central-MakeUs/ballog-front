import { MatchTeamEmotionDistribution } from '@/entities/record/ui/MatchTeamEmotionDistribution'
import { SectionHeader } from '@/shared/ui/common/SectionHeader'
import { type EmotionGroup } from '@/entities/record/model/record.type'

export const MatchTeamEmotionDistributionSection = ({
  isDuringMatch,
  isUserSupportingTeam,
  emotionGroupList,
  positiveEmotionPercent,
  negativeEmotionPercent,
}: {
  isDuringMatch: boolean
  isUserSupportingTeam: boolean
  emotionGroupList: EmotionGroup[]
  positiveEmotionPercent: number
  negativeEmotionPercent: number
}) => {
  return (
    <div className={'flex flex-col items-center justify-center'}>
      <SectionHeader title="경기 팀 감정분포" />
      {isDuringMatch ? <MatchTeamEmotionDistribution.Empty /> : null}
      {isUserSupportingTeam ? (
        <MatchTeamEmotionDistribution.ClickCount
          emotionGroupList={emotionGroupList}
        />
      ) : null}
    </div>
  )
}
