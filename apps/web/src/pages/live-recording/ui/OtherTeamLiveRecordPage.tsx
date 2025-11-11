import { useFlow } from '@stackflow/react/future'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useQuery } from '@tanstack/react-query'

import { BackArrow } from '@/assets/BackArrow'
import { cn } from '@/shared/lib/classnames'
import type { RecordingResponse } from '@/entities/record/model/recording.type'
import type { EmotionType } from '@/entities/record/model/emotion.type'
import { GameInfoCard } from '@/entities/record/ui/GameInfoCard'
import { RecordCameraButton } from '@/features/record/ui/RecordCameraButton'
import { EmotionCard } from '@/shared/ui/common/Card/EmotionCard'
import { queryKeys } from '@/entities/record/api/record.queries'
import { TEAMS } from '@/shared/constants/teams'
import GrayInfoIcon from '@/assets/grayInfoIcon.svg?react'

import { useEmotionVote } from '../contexts/EmotionVoteContext'
import { calculateGradientColor } from '../utils/calculateGradientColor'

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
              지금 경기 팀 분위기
            </div>
            <p className="body-sm-light text-usage-text-subtle mb-6">
              다른 팬들의 감정을 실시간으로 확인해보세요.
            </p>
            {/* 감정 표시만 (투표 불가) */}
            <div className="flex flex-col w-full body-md-medium bg-usage-background-default py-8 rounded-xl">
              <div className="flex flex-row justify-center gap-1">
                <div className="flex flex-col">
                  <p>{TEAMS[data.data.homeTeam]}</p>
                  <EmotionCard.Active
                    data={[
                      {
                        name: '화나요',
                        value: data.data.homeTeamNegativePercent,
                      },
                      {
                        name: '기뻐요',
                        value: data.data.homeTeamPositivePercent,
                      },
                    ]}
                    className="bg-usage-background-default"
                  />
                </div>
                <div className="flex flex-col">
                  <p>{TEAMS[data.data.awayTeam]}</p>
                  <EmotionCard.Active
                    data={[
                      {
                        name: '화나요',
                        value: data.data.awayTeamNegativePercent,
                      },
                      {
                        name: '기뻐요',
                        value: data.data.awayTeamPositivePercent,
                      },
                    ]}
                    className="bg-usage-background-default"
                  />
                </div>
              </div>
              <p className="flex flex-row justify-center items-center body-sm-light text-brand-neutral-60 gap-1 mt-2">
                <GrayInfoIcon />
                그래프는 팀의 감정분포(%) 를 나타내요
              </p>
            </div>
          </div>
          <RecordCameraButton
            matchRecordId={recordingData.matchRecordId}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 w-max"
          />
        </div>
      </div>
    </AppScreen>
  )
}

export default OtherTeamLiveRecordPage
