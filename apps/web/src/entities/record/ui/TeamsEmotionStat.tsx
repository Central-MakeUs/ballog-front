import type { ReactNode } from 'react'
import { GrayInfoIcon } from '@ballog/asset/icons'

import { EmotionCard } from '@/shared/ui/common/Card/EmotionCard'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'
import { cn } from '@/shared/lib/classnames'

// TODO: Props 개선하기
// 의존주입? 역전?
interface TeamsEmotionStatProps {
  homeTeamKey: TeamKey
  awayTeamKey: TeamKey
  homePositive: number
  homeNegative: number
  awayPositive: number
  awayNegative: number
  isRecording?: boolean
}

const StatContainer = ({
  children,
  isRecording = false,
}: {
  children: ReactNode
  isRecording: boolean
}) => {
  return (
    <div
      className={cn(
        'flex flex-col w-full body-md-medium py-8 rounded-xl',
        isRecording
          ? 'bg-usage-background-subtle'
          : 'bg-usage-background-default px-4',
      )}
    >
      {children}
    </div>
  )
}

export const TeamsEmotionStat = ({
  homeTeamKey,
  awayTeamKey,
  homePositive,
  homeNegative,
  awayPositive,
  awayNegative,
  isRecording = false,
}: TeamsEmotionStatProps) => {
  return (
    <StatContainer isRecording={isRecording}>
      <div className="flex flex-row justify-center gap-1">
        <div className="flex flex-col items-center">
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
            showBadgeBg
            className={cn(
              isRecording
                ? 'bg-usage-background-subtle'
                : 'bg-usage-background-default',
            )}
          />
        </div>
        <div className="flex flex-col items-center">
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
            showBadgeBg
            className={cn(
              isRecording
                ? 'bg-usage-background-subtle'
                : 'bg-usage-background-default',
            )}
          />
        </div>
      </div>
      <p className="flex flex-row items-center justify-center gap-1 mt-2 body-sm-light text-brand-neutral-60">
        <GrayInfoIcon />
        그래프는 팀의 감정분포(%) 를 나타내요
      </p>
    </StatContainer>
  )
}
