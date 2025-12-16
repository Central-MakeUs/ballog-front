import { useFlow } from '@stackflow/react/future'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useQuery } from '@tanstack/react-query'

import { BackArrow } from '@/assets/BackArrow'
import { cn } from '@/shared/lib/classnames'
import type { RecordingResponse } from '@/entities/record/model/recording.type'
import { GameInfoCard } from '@/entities/record/ui/GameInfoCard'
import { RecordCameraButton } from '@/features/record/ui/RecordCameraButton'
import { queryKeys } from '@/entities/record/api/record.queries'
import { TeamsEmotionStatWidget } from '@/widgets/TeamsEmotionStatWidget'

import { useEmotionVote } from '../contexts/EmotionVoteContext'
import { calculateGradientColor } from '../utils/calculateGradientColor'

interface OtherTeamLiveRecordPageProps {
  matchId: number
  isLoading: boolean
  recordingData: RecordingResponse
}

const OtherTeamLiveRecordPage = ({
  recordingData,
}: OtherTeamLiveRecordPageProps) => {
  const { data, isLoading } = useQuery({
    ...queryKeys.getEmotionStats(recordingData.matchesId),
    refetchInterval: 30_000,
  })

  const { pop } = useFlow()
  const { joyPercent, angryPercent } = useEmotionVote()

  let bgColor: string | undefined = undefined

  if (joyPercent > angryPercent && joyPercent > 50) {
    bgColor = calculateGradientColor('joy', joyPercent)
  } else if (angryPercent > joyPercent && angryPercent > 50) {
    bgColor = calculateGradientColor('angry', angryPercent)
  }

  if (isLoading) return <div>기록을 불러오는 중입니다</div>

  if (!data) return <div>기록이 없습니다</div>

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
      <div className="flex flex-col items-center justify-center max-h-full px-4 pt-4">
        {/* 경기 정보 */}
        <GameInfoCard recordingData={recordingData} className="mb-6" />

        <div
          className={cn(
            'rounded-xlarge border-none border-usage-border-strong bg-usage-background-subtle w-screen h-screen -px-4',
          )}
          style={{
            background: bgColor
              ? `linear-gradient(to bottom, ${bgColor}, bg-brand-neutral-90 50%)`
              : 'bg-brand-neutral-90',
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
              지금 경기 팀 분위기
            </div>
            <p className="mb-6 body-sm-light text-usage-text-subtle">
              다른 팬들의 감정을 실시간으로 확인해보세요.
            </p>
            {/* 팀 감정분포 */}
            <TeamsEmotionStatWidget
              homeTeamKey={data.data.homeTeam}
              awayTeamKey={data.data.awayTeam}
              homePositive={data.data.homeTeamPositivePercent}
              homeNegative={data.data.homeTeamNegativePercent}
              awayPositive={data.data.awayTeamPositivePercent}
              awayNegative={data.data.awayTeamNegativePercent}
            />
          </div>
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

export default OtherTeamLiveRecordPage
