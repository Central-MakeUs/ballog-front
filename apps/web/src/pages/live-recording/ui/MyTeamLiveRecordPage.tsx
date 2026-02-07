import { AppScreen } from '@stackflow/plugin-basic-ui'

import { cn } from '@/shared/lib/classnames'
import { EmotionVoteWidget } from '@/pages/live-recording/ui/EmotionVoteWidget'
import { useMyTeamLiveRecord } from '@/pages/live-recording/hooks'
import { GameInfoCard } from '@/entities/record/ui/GameInfoCard'
import { LottieRefProvider } from '@/pages/live-recording/contexts/lottieRefContext'
import { BackArrow } from '@/assets/BackArrow'
import { RecordCameraButton } from '@/features/record/ui/RecordCameraButton'

import { ToolTipPopover } from './ToolTipPopover'

const MyTeamLiveRecordPage = () => {
  const {
    recordingData,
    emotionData,
    teamName,
    gradientStyle,
    handleEmotionSubmit,
    matchRecordId,
    imageList,
  } = useMyTeamLiveRecord()

  if (!recordingData || !emotionData) return null

  return (
    <AppScreen
      appBar={{
        activityEnterStyle: 'slideInLeft',
        backButton: {
          renderIcon: () => (
            <BackArrow className="dark:text-brand-neutral-white light:text-brand-neutral-70" />
          ),
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
              지금 {teamName}팀 분위기 <ToolTipPopover />
            </div>
            <p className="mb-6 body-sm-light text-usage-text-subtle">
              클릭 한 번으로 순간의 감정을 표현해보세요.
            </p>

            <LottieRefProvider>
              <EmotionVoteWidget
                emotions={emotionData}
                onEmotionSubmit={handleEmotionSubmit}
              />
            </LottieRefProvider>
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

export default MyTeamLiveRecordPage
