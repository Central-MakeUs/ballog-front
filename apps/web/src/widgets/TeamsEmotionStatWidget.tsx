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
    <div className="flex flex-col w-full py-8 body-md-medium bg-usage-background-default rounded-xl">
      <div className="flex flex-row justify-center gap-1">
        <div className="flex flex-col">
          <p className="text-usage-text-default">{TEAMS[homeTeamKey]}</p>
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
          <p className="text-usage-text-default">{TEAMS[awayTeamKey]}</p>
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
      <p className="flex flex-row items-center justify-center gap-1 mt-2 body-sm-light text-brand-neutral-60">
        <GrayInfoIcon />
        그래프는 팀의 감정분포(%) 를 나타내요
      </p>
    </div>
  )
}
