import { format } from 'date-fns'
import { Vs } from '@ballog/asset/icons'

import type { Match } from '@/entities/match/model/match.type'
import { STADIUM } from '@/shared/constants/stadium'
import { SHORT_TEAM_NAMES } from '@/shared/constants/teams'
import { Skeleton } from '@/shared/ui/common/Skeleton'

export const TodayMatchCardSkeleton = () => (
  <div className="bg-brand-neutral-5 border border-brand-neutral-30 rounded-[20px] p-6 w-full flex flex-col gap-4 items-center">
    <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center gap-2">
        <Skeleton className="w-12 h-7 rounded-md" />
        <Skeleton className="w-6 h-4 rounded-md" />
        <Skeleton className="w-9 h-7 rounded-md" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-[70px] h-6 rounded-md" />
        <Skeleton className="w-[60px] h-6 rounded-md" />
      </div>
    </div>
    <Skeleton className="w-full h-12 rounded-[8px]" />
  </div>
)

interface NoMatchCardProps {
  onViewPreviousRecords: () => void
}

export const NoMatchCard = ({ onViewPreviousRecords }: NoMatchCardProps) => {
  const today = format(new Date(), 'yy.MM.dd')

  return (
    <div className="bg-brand-neutral-5 border border-brand-neutral-30 rounded-[20px] p-6 w-full flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-2 items-center w-full">
        <span className="body-md-light text-usage-text-subtle">{today}</span>
        <span className="body-lg-bold text-usage-text-subtle">
          오늘 예정된 경기가 없습니다.
        </span>
      </div>
      <button
        type="button"
        className="bg-brand-primary-subtle h-12 rounded-[8px] w-full flex items-center justify-center"
        onClick={onViewPreviousRecords}
      >
        <span className="body-md-medium text-brand-primary-pressed">
          이전 기록 보러가기
        </span>
      </button>
    </div>
  )
}

interface TodayMatchCardProps {
  match: Match
  isRecorded?: boolean
  onRecordEmotion: () => void
}

export const TodayMatchCard = ({
  match,
  isRecorded = false,
  onRecordEmotion,
}: TodayMatchCardProps) => {
  const homeTeamShort = SHORT_TEAM_NAMES[match.homeTeam]
  const awayTeamShort = SHORT_TEAM_NAMES[match.awayTeam]
  const stadiumName = STADIUM[match.stadium]
  const formattedDate = format(new Date(match.matchesDate), 'yy.MM.dd')

  return (
    <div className="bg-brand-neutral-5 border border-brand-neutral-30 rounded-[20px] p-6 w-full flex flex-col gap-4 items-center">
      <div className="flex flex-col gap-1 items-center">
        <div className="flex items-center gap-2">
          <span className="body-lg-bold text-brand-neutral-80">
            {homeTeamShort}
          </span>
          <Vs className="w-5 h-5" />
          <span className="body-lg-bold text-brand-neutral-80">
            {awayTeamShort}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="body-md-light text-usage-text-subtle w-[70px] text-center">
            {stadiumName}
          </span>
          <span className="body-md-light text-usage-text-subtle w-[60px] text-center">
            {formattedDate}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="bg-brand-primary-subtle h-12 rounded-[8px] w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onRecordEmotion}
        disabled={isRecorded}
      >
        <span className="body-md-medium text-brand-primary-pressed">
          오늘 감정 남기기
        </span>
      </button>
    </div>
  )
}
