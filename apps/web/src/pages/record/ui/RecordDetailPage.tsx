import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { BackArrow } from '@/assets/BackArrow'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { queryKeys } from '@/entities/record/api/record.queries'
import { Loading } from '@/shared/ui/common'
import { RecordLogCard } from '@/entities/record/ui/RecordLogCard'
import { ImageTimeLine } from '@/features/record/ui/ImageTimeLine'
import { EmotionTimeLine } from '@/features/record/ui/EmotionTimeLine'
import { BottomButtonGroup } from '@/features/record/ui/BottomButtonGroup'
import { ImageContextProvider } from '@/features/record/hooks/ImageContextProvider'
import { DEFAULT_RECORD_DATA } from '@/entities/record/constants/record'

export const RecordDetailPage = ({
  params,
}: {
  params: { matchRecordId: string }
}) => {
  const { data, isLoading, error } = useQuery(
    queryKeys.getRecordDetail(Number(params.matchRecordId)),
  )

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
  } = data?.data ?? DEFAULT_RECORD_DATA.RecordDetail

  if (isLoading) {
    return <Loading text="관람 기록을 불러오는 중..." />
  }

  if (error || !data) {
    toast.error('관람 기록을 불러오는 중 오류가 발생했습니다.')
  }

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

          <ImageTimeLine matchRecordId={matchRecordId} />
          <EmotionTimeLine
            positiveEmotionPercent={positiveEmotionPercent}
            negativeEmotionPercent={negativeEmotionPercent}
            emotionGroupList={emotionGroupList}
          />
          <BottomButtonGroup recordId={matchRecordId} />
        </AppLayout>
      </ImageContextProvider>
    </AppScreen>
  )
}

export default RecordDetailPage
