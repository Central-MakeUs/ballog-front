import React from 'react'

import { TeamEmotionDistribution } from '@/entities/record/ui/TeamEmotionDistribution'
import { TeamsEmotionStat } from '@/entities/record/ui/TeamsEmotionStat'
import { useGetRecordDetail } from '@/features/record/hooks/useGetRecordDetail'

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

export const EmotionDistribution = ({
  matchRecordId,
}: {
  matchRecordId: number
}) => {
  const { isUserSupportingTeam, isDuringMatch, recordDetail } =
    useGetRecordDetail({
      matchRecordId,
    })

  if (!recordDetail) return <></>

  const {
    homeTeam,
    awayTeam,
    positiveEmotionPercent,
    negativeEmotionPercent,
    emotionGroupList,
  } = recordDetail

  if (isDuringMatch) {
    return (
      <>
        <SectionContainer>
          <TeamEmotionDistribution.Empty />
        </SectionContainer>
      </>
    )
  }

  if (!isDuringMatch) {
    return (
      <SectionContainer>
        <TeamsEmotionStat
          homeTeamKey={homeTeam}
          awayTeamKey={awayTeam}
          homePositive={positiveEmotionPercent}
          homeNegative={negativeEmotionPercent}
          awayPositive={positiveEmotionPercent}
          awayNegative={negativeEmotionPercent}
          isRecording={true}
        />
        {isUserSupportingTeam && (
          <TeamEmotionDistribution.ClickCount
            emotionGroupList={emotionGroupList}
          />
        )}
      </SectionContainer>
    )
  }

  return <></>
}
