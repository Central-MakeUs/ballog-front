import { useFlow } from '@stackflow/react/future'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { toast } from 'sonner'

import { BackArrow } from '@/assets/BackArrow'
import { cn } from '@/shared/lib/classnames'
import type { RecordingResponse } from '@/entities/record/model/recording.type'
import type { EmotionType } from '@/entities/record/model/emotion.type'
import { GameInfoCard } from '@/entities/record/ui/GameInfoCard'

import { LottieRefProvider } from '../contexts/lottieRefContext'
import { useEmotionVote } from '../contexts/EmotionVoteContext'
import { calculateGradientColor } from '../utils/calculateGradientColor'

import { EmotionVoteWidget } from './EmotionVoteWidget'
import { ToolTipPopover } from './ToolTipPopover'

interface OtherTeamLiveRecordPageProps {
  matchId: number
  isLoading: boolean
  recordingData: RecordingResponse
  emotionData: EmotionType
}

const OtherTeamLiveRecordPage = ({
  recordingData,
  emotionData,
}: OtherTeamLiveRecordPageProps) => {
  const { pop } = useFlow()
  const { joyPercent, angryPercent } = useEmotionVote()

  let bgColor: string | undefined = undefined

  if (joyPercent > angryPercent && joyPercent > 50) {
    bgColor = calculateGradientColor('joy', joyPercent)
  } else if (angryPercent > joyPercent && angryPercent > 50) {
    bgColor = calculateGradientColor('angry', angryPercent)
  }

  return (
    <AppScreen
      appBar={{
        title: (
          <span className="flex text-usage-text-default">경기 관전 중</span>
        ),
        activityEnterStyle: 'slideInLeft',
        backButton: {
          renderIcon: () => <BackArrow />,
          onClick: () => {
            pop()
          },
        },
        height: '48px',
      }}
    >
      <div className="max-h-full flex flex-col justify-center items-center px-4 pt-4">
        {/* 경기 정보 */}
        <GameInfoCard recordingData={recordingData} className="mb-6" />

        <div
          className={cn(
            'rounded-xlarge border-none border-usage-border-strong bg-usage-background-subtle w-screen h-screen -px-4',
          )}
          style={{
            background: bgColor
              ? `linear-gradient(to bottom, ${bgColor}, #212121 50%)`
              : '#212121',
          }}
        >
          {/* 텍스트 */}
          <div
            className={cn(
              'flex flex-col items-center text-center w-full px-4',
              'mt-8 mb-8',
            )}
          >
            <div className="body-lg-bold text-usage-text-default mb-2 inline-flex items-center relative">
              지금 경기 분위기 <ToolTipPopover />
            </div>
            <p className="body-sm-light text-usage-text-subtle mb-6">
              다른 팬들의 감정을 실시간으로 확인해보세요.
            </p>
            {/* 감정 표시만 (투표 불가) */}

            <LottieRefProvider>
              <EmotionVoteWidget
                emotions={emotionData}
                onEmotionSubmit={() => {
                  // 다른 팀 경기는 감정 투표 불가
                  toast.info('내 팀 경기에서만 감정을 표현할 수 있습니다')
                }}
                // isReadOnly={true}
              />
            </LottieRefProvider>
          </div>
        </div>
      </div>
    </AppScreen>
  )
}

export default OtherTeamLiveRecordPage
