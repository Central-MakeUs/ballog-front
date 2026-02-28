import type { ActivityComponentType } from '@stackflow/react'
import { AppScreen } from '@stackflow/plugin-basic-ui'

import { EmotionVoteProvider } from '@/pages/live-recording/contexts/EmotionVoteContext'
import { LiveRecordProvider } from '@/pages/live-recording/contexts/LiveRecordContext'
import { LiveRecordingMachineProvider } from '@/pages/live-recording/contexts/LiveRecordingMachineContext'
import { LottieRefProvider } from '@/pages/live-recording/contexts/lottieRefContext'
import { cn } from '@/shared/lib/classnames'
import { Loading } from '@/shared/ui/common'
import { BackArrow } from '@/assets/BackArrow'
import { GameInfoCard } from '@/entities/record/ui/GameInfoCard'
import { RecordCameraButton } from '@/features/record/ui/RecordCameraButton'

import { useMyTeamLiveRecord } from '../hooks/facades/useMyTeamLiveRecord'

import { EmotionVoteWidget } from './EmotionVoteWidget'
import { ToolTipPopover } from './ToolTipPopover'
import OtherTeamLiveRecordPage from './OtherTeamLiveRecordPage'

/**
 * 내 팀 컨텐츠
 * FSM Context에서 상태를 가져오고, RQ 캐시에서 데이터를 읽습니다.
 */
const MyTeamContent = () => {
  const {
    recordingData,
    teamName,
    gradientStyle,
    handleEmotionSubmit,
    matchRecordId,
    imageList,
  } = useMyTeamLiveRecord()

  if (!recordingData) return null

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
              <EmotionVoteWidget onEmotionSubmit={handleEmotionSubmit} />
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

/**
 * LiveRecordPage Content
 * FSM 상태를 구독하여 로딩/렌더링을 결정합니다.
 */
const LiveRecordPageContent = () => {
  const { machineState, isMyTeam, recordingData } = useMyTeamLiveRecord()

  const isLoading = machineState === 'new' || !recordingData

  if (isLoading) {
    return <Loading text="페이지 불러오는 중..." />
  }

  return isMyTeam ? <MyTeamContent /> : <OtherTeamLiveRecordPage />
}

/**
 * LiveRecordPage - FSM 기반 아키텍처
 *
 * Provider 순서:
 * 1. LiveRecordProvider - matchId Context
 * 2. EmotionVoteProvider - 감정 퍼센트 (FSM Command가 업데이트)
 * 3. LiveRecordingMachineProvider - FSM Context (EmotionVote 필요)
 * 4. LiveRecordPageContent - FSM 상태 구독
 */
const LiveRecordPage: ActivityComponentType<{ matchId: string }> = ({
  params,
}: {
  params: { matchId: string }
}) => {
  const matchId = Number(params.matchId)

  return (
    <LiveRecordProvider matchId={matchId}>
      <EmotionVoteProvider>
        <LiveRecordingMachineProvider>
          <LiveRecordPageContent />
        </LiveRecordingMachineProvider>
      </EmotionVoteProvider>
    </LiveRecordProvider>
  )
}

export default LiveRecordPage
