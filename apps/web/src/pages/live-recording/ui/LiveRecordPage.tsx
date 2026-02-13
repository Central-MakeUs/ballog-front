import type { ActivityComponentType } from '@stackflow/react'

import { EmotionVoteProvider } from '@/pages/live-recording/contexts/EmotionVoteContext'
import { LiveRecordProvider } from '@/pages/live-recording/contexts/LiveRecordContext'
import { Loading } from '@/shared/ui/common'
import { useLiveRecordPage } from '@/pages/live-recording/hooks'

import MyTeamLiveRecordPage from './MyTeamLiveRecordPage'
import OtherTeamLiveRecordPage from './OtherTeamLiveRecordPage'

const LiveRecordPageContent = () => {
  const { isReady, isMyTeam, initialJoyPercent, initialAngryPercent } =
    useLiveRecordPage()

  if (!isReady) {
    return <Loading text="페이지 불러오는 중..." />
  }

  return (
    <EmotionVoteProvider
      initialJoyPercent={initialJoyPercent}
      initialAngryPercent={initialAngryPercent}
    >
      {isMyTeam ? <MyTeamLiveRecordPage /> : <OtherTeamLiveRecordPage />}
    </EmotionVoteProvider>
  )
}

const LiveRecordPage: ActivityComponentType<{ matchId: string }> = ({
  params,
}: {
  params: { matchId: string }
}) => {
  const matchId = Number(params.matchId)

  return (
    <LiveRecordProvider matchId={matchId}>
      <LiveRecordPageContent />
    </LiveRecordProvider>
  )
}

export default LiveRecordPage
