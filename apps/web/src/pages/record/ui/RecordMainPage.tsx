import { useQuery } from '@tanstack/react-query'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { toast } from 'sonner'

import { useFlow } from '@/app/routes/stackflow'
import { IntuitionCard } from '@/shared/ui/common/Card/intuitionCard'
import { RecordList } from '@/features/record/ui/RecordList'
import { EmotionCard } from '@/shared/ui/common/Card/EmotionCard'
import {
  queryKeys,
  type RecordResponseDTO,
  DEFAULT_RECORD_DATA,
} from '@/entities/record'
import { Loading } from '@/shared/ui/common'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { SectionHeader } from '@/shared/ui/common'

const RecordMainContent = ({
  data,
}: {
  data: RecordResponseDTO | undefined
}) => {
  const {
    totalCount,
    winRate,
    totalNegativeEmotionPercent,
    totalPositiveEmotionPercent,
    records,
  } = data?.data ?? DEFAULT_RECORD_DATA.RecordMain

  return (
    <>
      {/* 대시보드 카드 섹션 */}
      <div className="flex gap-4 px-4 mt-4 w-full">
        <div className="flex-1 flex flex-col gap-4">
          <SectionHeader title="관람 횟수/승률" />
          {totalCount === 0 ? (
            <IntuitionCard.Disabled />
          ) : (
            <IntuitionCard.Active matchCount={totalCount} winRate={winRate} />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <SectionHeader title="감정분포" />
          {totalCount === 0 ? (
            <EmotionCard.Disabled />
          ) : (
            <EmotionCard.Active
              data={[
                {
                  name: '화나요',
                  value: parseInt(totalNegativeEmotionPercent.toString()),
                },
                {
                  name: '기뻐요',
                  value: parseInt(totalPositiveEmotionPercent.toString()),
                },
              ]}
            />
          )}
        </div>
      </div>

      {/* 기록 목록 섹션 */}
      <div className="mt-10 px-4 gap-4 flex flex-col w-full">
        <SectionHeader title="전체 관람로그" />
        <RecordList records={records} />
      </div>
    </>
  )
}

export const RecordMainPage = () => {
  const { data, isLoading, error } = useQuery({
    ...queryKeys.getRecord(),
    staleTime: 0,
    gcTime: 0,
  })
  const { pop } = useFlow()

  if (error) {
    toast.error('관람 기록을 불러오는 중 오류가 발생했습니다.')
  }
  return (
    <AppScreen
      appBar={{
        title: (
          <span className="text-usage-text-default body-md-bold">관람로그</span>
        ),
        backButton: { onClick: () => pop({ animate: false }) },
      }}
    >
      <AppLayout>
        {isLoading ? (
          <Loading text="관람 기록을 불러오는 중..." />
        ) : (
          <RecordMainContent data={data} />
        )}
        <GlobalNavigationBar />
      </AppLayout>
    </AppScreen>
  )
}

export default RecordMainPage
