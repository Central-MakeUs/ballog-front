import { useQuery } from '@tanstack/react-query'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { toast } from 'sonner'

import { IntuitionCard } from '@/shared/ui/common/Card/intuitionCard'
import { RecordList } from '@/features/record/ui/RecordList'
import { EmotionCard } from '@/shared/ui/common/Card/EmotionCard'
import { queryKeys } from '@/entities/record/api/query-key'
import { Loading } from '@/shared/ui/common'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { AppLayout } from '@/shared/ui/layout/AppLayout'

export const RecordMainPage = () => {
  const { data, isLoading, error } = useQuery(queryKeys.getRecord())

  if (isLoading) {
    return <Loading text="직관 기록을 불러오는 중..." />
  }

  if (error) {
    toast('직관 기록을 불러오는 중 오류가 발생했습니다.')
  }

  return (
    <AppScreen
      appBar={{
        title: (
          <span className="text-usage-text-default body-md-bold">직관로그</span>
        ),
      }}
    >
      <AppLayout>
        {/* 대시보드 카드 섹션 */}
        <div className="flex gap-4 px-4 mt-4 w-full">
          <div className="flex-1 flex flex-col gap-4">
            <div className="body-sm-bold text-brand-neutral-white">
              직관 횟수/승률
            </div>
            {data?.data.totalCount === 0 ? (
              <IntuitionCard.Disabled />
            ) : (
              <IntuitionCard.Active
                matchCount={data?.data.totalCount ?? 0}
                winRate={data?.data.winRate ?? 0}
              />
            )}
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="body-sm-bold text-brand-neutral-white">
              감정분포
            </div>
            {data?.data.totalCount === 0 ? (
              <EmotionCard.Disabled />
            ) : (
              <EmotionCard.Active
                emotion={'기뻐요'}
                rate={data?.data.positiveEmotionPercent ?? 0}
              />
            )}
          </div>
        </div>

        {/* 기록 목록 섹션 */}
        <div className="mt-10 px-4 gap-4 flex flex-col w-full">
          <div className="body-sm-bold text-brand-neutral-white">
            직관 횟수/승률
          </div>
          <RecordList records={data?.data.records ?? []} />
        </div>
        <GlobalNavigationBar />
      </AppLayout>
    </AppScreen>
  )
}

export default RecordMainPage
