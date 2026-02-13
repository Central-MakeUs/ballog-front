import { AppScreen } from '@stackflow/plugin-basic-ui'

import { BackArrow } from '@/assets/BackArrow'
import { cn } from '@/shared/lib/classnames'
import { GameInfoCard } from '@/entities/record/ui/GameInfoCard'
import { RecordCameraButton } from '@/features/record/ui/RecordCameraButton'
import { TeamsEmotionStat } from '@/entities/record/ui/TeamsEmotionStat'
import { useOtherTeamLiveRecord } from '@/pages/live-recording/hooks'

const OtherTeamLiveRecordPage = () => {
  const {
    recordingData,
    stats,
    isStatsLoading,
    gradientStyle,
    goBack,
    matchRecordId,
    imageList,
  } = useOtherTeamLiveRecord()

  if (isStatsLoading) return <div>기록을 불러오는 중입니다</div>

  if (!recordingData || !stats) return <div>기록이 없습니다</div>

  const {
    homeTeam,
    awayTeam,
    homeTeamPositivePercent,
    homeTeamNegativePercent,
    awayTeamPositivePercent,
    awayTeamNegativePercent,
  } = stats

  return (
    <AppScreen
      appBar={{
        activityEnterStyle: 'slideInLeft',
        backButton: {
          renderIcon: () => (
            <BackArrow className="dark:text-brand-neutral-white light:text-brand-neutral-70" />
          ),
          onClick: goBack,
        },
        height: '48px',
      }}
    >
      <div className="flex flex-col items-center justify-center max-h-full px-4 pt-4">
        <GameInfoCard recordingData={recordingData} className="mb-6" />

        <div
          className={cn(
            'rounded-t-xlarge border-none border-usage-border-strong bg-usage-background-subtle w-screen h-screen -px-4',
          )}
          style={gradientStyle}
        >
          <div
            className={cn(
              'flex flex-col items-center text-center w-full px-4',
              'mt-8 mb-8',
            )}
          >
            <div className="relative inline-flex items-center mb-2 body-lg-bold text-usage-text-default">
              지금 경기 팀 분위기
            </div>
            <p className="mb-6 body-sm-light text-usage-text-subtle">
              다른 팬들의 감정을 실시간으로 확인해보세요.
            </p>

            <TeamsEmotionStat
              homeTeamKey={homeTeam}
              awayTeamKey={awayTeam}
              homePositive={homeTeamPositivePercent}
              homeNegative={homeTeamNegativePercent}
              awayPositive={awayTeamPositivePercent}
              awayNegative={awayTeamNegativePercent}
            />
          </div>

          <RecordCameraButton
            matchRecordId={matchRecordId}
            initialImages={imageList}
            className="fixed -translate-x-1/2 bottom-10 left-1/2 w-max"
          />
        </div>
      </div>
    </AppScreen>
  )
}

export default OtherTeamLiveRecordPage
