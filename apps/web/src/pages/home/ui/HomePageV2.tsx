import { AppScreen } from '@stackflow/plugin-basic-ui'
import { type ActivityComponentType } from '@stackflow/react'
import { useQuery } from '@tanstack/react-query'
import type { CSSProperties } from 'react'

import { matches } from '@/entities/match/api'
import type { EmotionType } from '@/entities/record/model/record.type'
import { recording } from '@/entities/record/api/recording.queries'
import { useCheckSignupFinished } from '@/features/auth/hooks/useCheckSignupFinished'
import { useFcmToken } from '@/features/fcm/hooks/useFcmToken'
import { CharacterSection } from '@/features/home/ui/CharacterSection'
import { HomeHeaderV2 } from '@/widgets/header/ui/HomeHeaderV2'
import {
  NoMatchCard,
  TodayMatchCard,
  TodayMatchCardSkeleton,
} from '@/features/home/ui/TodayMatchCard'
import { useSortMatchByBaseBallTeam } from '@/features/match/hooks/useSortMatchByBaseBallTeam'
import { useFlow } from '@/app/routes/stackflow'
import { useUserQuery } from '@/entities/auth/hooks/useUserQuery'
import CalendarIcon from '@/assets/CalendarIcon'
import { Chevron } from '@/assets/Chevron'
import { GlobalNavigationBar } from '@/widgets/navigation'

const HomeContentV2 = ({
  onViewAllMatches,
}: {
  onViewAllMatches: () => void
}) => {
  const { data, isLoading } = useQuery(matches.today())
  const { push, replace } = useFlow()

  const todayMatches = data?.data ?? []
  const sortedMatches = useSortMatchByBaseBallTeam(todayMatches)
  const primaryMatch = sortedMatches[0] ?? null

  const primaryMatchId = primaryMatch?.matchesId ?? null
  const { data: recordingData } = useQuery({
    ...recording.getRecording(primaryMatchId ?? 0),
    enabled: primaryMatchId !== null,
    retry: false,
  })

  const currentEmotion: EmotionType | null = (() => {
    if (!recordingData?.data) return null
    const { positiveEmotionPercent, negativeEmotionPercent } =
      recordingData.data
    if (positiveEmotionPercent === 0 && negativeEmotionPercent === 0)
      return null
    return positiveEmotionPercent >= negativeEmotionPercent
      ? 'POSITIVE'
      : 'NEGATIVE'
  })()

  const isNoMatch = !primaryMatch || primaryMatch.status === 'CANCELED'

  const handleRecordEmotion = () => {
    if (!primaryMatch) return
    push(
      'LiveRecord',
      { matchId: String(primaryMatch.matchesId) },
      { animate: false },
    )
  }

  const handleViewPreviousRecords = () => {
    replace('Record', {}, { animate: false })
  }

  return (
    <div className="flex flex-col items-center w-full gap-2 pb-24">
      <CharacterSection emotion={currentEmotion} />

      <div className="flex flex-col items-center w-full gap-4 px-5">
        {isLoading ? (
          <TodayMatchCardSkeleton />
        ) : isNoMatch ? (
          <NoMatchCard onViewPreviousRecords={handleViewPreviousRecords} />
        ) : (
          <TodayMatchCard
            match={primaryMatch}
            isRecorded={currentEmotion !== null}
            onRecordEmotion={handleRecordEmotion}
          />
        )}

        <button
          type="button"
          className="flex items-center h-5 gap-1"
          onClick={onViewAllMatches}
        >
          <CalendarIcon
            className="w-5 h-5"
            style={
              {
                '--calendar-frame-color': '#757575',
                '--calendar-inside-color': '#ffffff',
              } as CSSProperties
            }
          />
          <span className="body-sm-medium text-usage-text-subtle">
            전체 경기 보기
          </span>
          <Chevron className="w-5 h-5 text-usage-text-subtle" />
        </button>
      </div>
    </div>
  )
}

const HomePageV2: ActivityComponentType = () => {
  useFcmToken()
  useCheckSignupFinished()

  const { user } = useUserQuery()
  const { push, replace } = useFlow()

  const nickname = user?.nickname ?? '볼로그'

  return (
    <AppScreen>
      <div className="flex flex-col w-full h-full bg-usage-background-default">
        <HomeHeaderV2
          nickname={nickname}
          onProfileClick={() => replace('My', {}, { animate: false })}
        />
        <div className="flex-1 overflow-y-auto">
          <HomeContentV2
            onViewAllMatches={() =>
              push('MatchSchedule', {}, { animate: false })
            }
          />
        </div>
        <GlobalNavigationBar />
      </div>
    </AppScreen>
  )
}

export default HomePageV2
