import { AppScreen } from '@stackflow/plugin-basic-ui'

import { cn } from '@/shared/lib/classnames'
import { EmotionVoteWidget } from '@/pages/live-recording/ui/EmotionVoteWidget'
import { useEmotionVote } from '@/pages/live-recording/contexts/EmotionVoteContext'
import { calculateGradientColor } from '@/pages/live-recording/utils/calculateGradientColor'
import { usePostEmotion } from '@/pages/live-recording/hooks/usePostEmotion'
import type { EmotionType } from '@/entities/record/model/emotion.type'
import { GameInfoCard } from '@/entities/record/ui/GameInfoCard'
import type { RecordingResponse } from '@/entities/record/model/recording.type'
import { LottieRefProvider } from '@/pages/live-recording/contexts/lottieRefContext'
import { BackArrow } from '@/assets/BackArrow'
import { useSessionContext } from '@/entities/auth/hooks/useSessionContext'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'
import { RecordCameraButton } from '@/features/record/ui/RecordCameraButton'

import { ToolTipPopover } from './ToolTipPopover'

// 공통 Props 타입
interface MyTeamLiveRecordPageProps {
  matchId: number
  isLoading: boolean
  recordingData: RecordingResponse
  emotionData: EmotionType
}

// 내 팀 경기 페이지
const MyTeamLiveRecordPage = ({
  recordingData,
  emotionData,
}: MyTeamLiveRecordPageProps) => {
  const { mutate } = usePostEmotion()
  const { user } = useSessionContext()
  const { joyPercent, angryPercent } = useEmotionVote()

  let bgColor: string | undefined = undefined

  if (joyPercent > angryPercent && joyPercent > 50) {
    bgColor = calculateGradientColor('joy', joyPercent)
  } else if (angryPercent > joyPercent && angryPercent > 50) {
    bgColor = calculateGradientColor('angry', angryPercent)
  }

  const teamKey = user?.baseballTeam ?? 'NONE'
  const teamName = TEAMS[teamKey as TeamKey]

  return (
    <AppScreen
      appBar={{
        activityEnterStyle: 'slideInLeft',
        backButton: {
          renderIcon: () => <BackArrow className="dark:text-brand-neutral-white light:text-brand-neutral-70" />,
        },
        height: '48px',
      }}
    >
      <div className="flex flex-col items-center justify-center max-h-full px-4 pt-4">
        {/* 경기 정보 */}
        <GameInfoCard recordingData={recordingData} className="mb-6" />

        <div
          className={cn(
            'rounded-t-xlarge border-none border-usage-border-strong bg-usage-background-subtle w-screen h-screen -px-4',
          )}
          style={{
            background: bgColor
              ? `linear-gradient(to top, ${bgColor}, var(--color-usage-background-subtle) 50%)`
              : undefined,
          }}
        >
          {/* 텍스트 */}
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
            {/* 버튼 인터랙션 부분 */}

            <LottieRefProvider>
              <EmotionVoteWidget
                emotions={emotionData}
                onEmotionSubmit={(emotionType) => {
                  mutate({
                    matchRecordId: recordingData.matchRecordId,
                    emotionType,
                  })
                }}
              />
            </LottieRefProvider>
          </div>

          {/* 카메라 버튼 */}
          <RecordCameraButton
            matchRecordId={recordingData.matchRecordId}
            initialImages={recordingData.imageList}
            className="fixed -translate-x-1/2 bottom-10 left-1/2 w-max"
          />
        </div>
      </div>
    </AppScreen>
  )
}

export default MyTeamLiveRecordPage
