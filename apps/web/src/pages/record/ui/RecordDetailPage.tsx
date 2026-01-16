import { AppScreen } from '@stackflow/plugin-basic-ui'

import { BackArrow } from '@/assets/BackArrow'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { Loading } from '@/shared/ui/common'
import { RecordLogCard } from '@/entities/record/ui/RecordLogCard'
import { ImageTimeLine } from '@/features/record/ui/ImageTimeLine'
import { EmotionTimeLine } from '@/features/record/ui/EmotionTimeLine'
import { BottomButtonGroup } from '@/features/record/ui/BottomButtonGroup'
import { ImageContextProvider } from '@/features/record/hooks/ImageContextProvider'
import { useGetRecordDetail } from '@/features/record/hooks/useGetRecordDetail'
import { EmotionDistribution } from '@/features/record/ui/EmotionDistribution'

export const RecordDetailPage = ({
  params,
}: {
  params: { matchRecordId: string }
}) => {
  const matchRecordIdParam = Number(params.matchRecordId)

  const { recordDetail, isLoading, isUserSupportingTeam } =
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
          renderIcon: () => (
            <BackArrow className="dark:text-brand-neutral-white light:text-brand-neutral-70" />
          ),
        },
      }}
    >
      <ImageContextProvider initialImages={imageList}>
        <AppLayout>
          <div className="w-full px-4 pt-4">
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

          <EmotionDistribution matchRecordId={matchRecordId} />

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
