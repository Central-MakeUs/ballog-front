import { AppScreen } from '@stackflow/plugin-basic-ui'

import { BackArrow } from '@/assets/BackArrow'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { Loading } from '@/shared/ui/common'
import { RecordLogCard } from '@/entities/record/ui/RecordLogCard'
import { ImageTimeLine } from '@/features/record/ui/ImageTimeLine'
import { EmotionTimeLine } from '@/features/record/ui/EmotionTimeLine'
import { BottomButtonGroup } from '@/features/record/ui/BottomButtonGroup'
import { ImageContextProvider } from '@/features/record/hooks/ImageContextProvider'
import { useGetRecordDetail } from '@/pages/record/hooks/useGetRecordDetail'
import { MatchTeamEmotionDistribution } from '@/entities/record/ui/MatchTeamEmotionDistribution'

export const RecordDetailPage = ({
  params,
}: {
  params: { matchRecordId: string }
}) => {
  const matchRecordIdParam = Number(params.matchRecordId)

  const { recordDetail, isLoading, isUserSupportingTeam, isDuringMatch } =
    useGetRecordDetail({
      matchRecordId: matchRecordIdParam,
    })

  if (isLoading) {
    return <Loading text="관람 기록을 불러오는 중..." />
  }

  // 데이터가 없을 때
  if (!recordDetail) return null

  const {
    matchRecordId,
    homeTeam,
    awayTeam,
    stadium,
    matchDate,
    result,
    positiveEmotionPercent,
    negativeEmotionPercent,
    emotionGroupList,
    imageList,
  } = recordDetail

  return (
    <AppScreen
      appBar={{
        title: (
          <span className="text-usage-text-default body-md-bold">
            기록 상세보기
          </span>
        ),
        backButton: {
          renderIcon: () => <BackArrow />,
        },
      }}
    >
      <ImageContextProvider initialImages={imageList}>
        <AppLayout>
          <div className="px-4 pt-4 w-full">
            <RecordLogCard.Root key={matchRecordId}>
              <RecordLogCard.Info
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                stadium={stadium}
                date={matchDate}
                result={result}
              />
            </RecordLogCard.Root>
          </div>

          {/* 경기 중 표시 & 경기 팀 감정분포 */}
          {/*경기중이면 안보이고, 경기중이면 보이는 컴포넌트 */}
          {isDuringMatch && (
            <div className="flex flex-col items-center justify-center">
              <span className="text-usage-text-default body-md-bold">
                경기 중
              </span>
            </div>
          )}

          <MatchTeamEmotionDistribution.Empty />

          {/* 응원 팀 감정분포 */}
          {isUserSupportingTeam && (
            <EmotionTimeLine
              positiveEmotionPercent={positiveEmotionPercent}
              negativeEmotionPercent={negativeEmotionPercent}
              emotionGroupList={emotionGroupList}
            />
          )}

          {/* 사진 타임라인 */}
          <ImageTimeLine matchRecordId={matchRecordId} />
          <BottomButtonGroup recordId={matchRecordId} />
        </AppLayout>
      </ImageContextProvider>
    </AppScreen>
  )
}

export default RecordDetailPage
