import { EmotionCard } from '@/shared/ui/common/Card/EmotionCard'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'
import GrayInfoIcon from '@/assets/grayInfoIcon.svg?react'

interface TeamsEmotionStatWidgetProps {
  homeTeamKey: TeamKey
  awayTeamKey: TeamKey
  homePositive: number
  homeNegative: number
  awayPositive: number
  awayNegative: number
}

export const TeamsEmotionStatWidget = ({
  homeTeamKey,
  awayTeamKey,
  homePositive,
  homeNegative,
  awayPositive,
  awayNegative,
}: TeamsEmotionStatWidgetProps) => {
  return (
    <div className="flex flex-col w-full body-md-medium bg-usage-background-default py-8 rounded-xl">
      <div className="flex flex-row justify-center gap-1">
        <div className="flex flex-col">
          <p>{TEAMS[homeTeamKey]}</p>
          <EmotionCard.Active
            data={[
              {
                name: '화나요',
                value: homeNegative,
              },
              {
                name: '기뻐요',
                value: homePositive,
              },
            ]}
            className="bg-usage-background-default"
          />
        </div>
        <div className="flex flex-col">
          <p>{TEAMS[awayTeamKey]}</p>
          <EmotionCard.Active
            data={[
              {
                name: '화나요',
                value: awayNegative,
              },
              {
                name: '기뻐요',
                value: awayPositive,
              },
            ]}
            className="bg-usage-background-default"
          />
        </div>
      </div>
      <p className="flex flex-row justify-center items-center body-sm-light text-brand-neutral-60 gap-1 mt-2">
        <GrayInfoIcon />
        그래프는 팀의 감정분포(%) 를 나타내요
      </p>
    </div>
  )
}
