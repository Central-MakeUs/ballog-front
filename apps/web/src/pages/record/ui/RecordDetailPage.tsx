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

export const RecordDetailPage = ({
  params,
}: {
  params: { matchRecordId: string }
}) => {
  const { data, isLoading, error } = useQuery(
    queryKeys.getRecordDetail(Number(params.matchRecordId)),
  )

  if (isLoading) {
    return <Loading text="관람 기록을 불러오는 중..." />
  }

  if (error) {
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
          renderIcon: () => <BackArrow />,
        },
      }}
    >
      <ImageContextProvider initialImages={data?.data.imageList ?? []}>
        <AppLayout>
          <div className="px-4 pt-4 w-full">
            <RecordLogCard.Root key={data?.data.matchRecordId}>
              <RecordLogCard.Info
                homeTeam={data?.data.homeTeam ?? 'SSG_LANDERS'}
                awayTeam={data?.data.awayTeam ?? 'LG_TWINS'}
                stadium={data?.data.stadium ?? '잠실야구장'}
                date={data?.data.matchDate ?? '2025.07.09 (수) 오후 6:30'}
                result={data?.data.result ?? 'DRAW'}
              />
            </RecordLogCard.Root>
          </div>

          <ImageTimeLine matchRecordId={data?.data.matchRecordId ?? 0} />
          <EmotionTimeLine
            positiveEmotionPercent={data?.data.positiveEmotionPercent ?? 0}
            negativeEmotionPercent={data?.data.negativeEmotionPercent ?? 0}
            emotionGroupList={data?.data.emotionGroupList ?? []}
          />
          <BottomButtonGroup recordId={data?.data.matchRecordId ?? 0} />
        </AppLayout>
      </ImageContextProvider>
    </AppScreen>
  )
}

export default RecordDetailPage
