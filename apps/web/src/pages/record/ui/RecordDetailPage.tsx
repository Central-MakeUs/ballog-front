import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useQuery } from '@tanstack/react-query'
import { toZonedTime } from 'date-fns-tz'
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
import type {
  RecordDetailResponse,
  RecordDetailResponseDTO,
  RecordResult,
} from '@/entities/record/model/record.type'
import { TIME_ZONE } from '@/shared/constants/time'
import type { TeamKey } from '@/shared/constants/teams'
import { useSessionContext } from '@/entities/auth/hooks/useSessionContext'

export const RecordDetailPage = ({
  params,
}: {
  params: { matchRecordId: string }
}) => {
  const { user } = useSessionContext()
  const { data, isLoading, error } = useQuery<RecordDetailResponseDTO>(
    queryKeys.getRecordDetail(Number(params.matchRecordId)),
  )

  const recordDetail: RecordDetailResponse = data

  const isUserSupportingTeam = isSupportingTeam({
    userTeam: user?.baseballTeam ?? 'NONE',
    homeTeam: recordDetail.homeTeam ?? 'NONE',
    awayTeam: recordDetail.awayTeam ?? 'NONE',
  })
  const isDuringMatch = checkIsDuringMatch({
    result: recordDetail.result,
    matchDate: recordDetail.matchDate,
  })

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

// 경기 중 판단 함수
// result가 null 이고, 날짜가 오늘 이하면 경기 중
function checkIsDuringMatch({
  result,
  matchDate,
}: {
  result: RecordResult
  matchDate: string
}) {
  const now = toZonedTime(new Date(), TIME_ZONE)
  const matchDateObj = toZonedTime(new Date(matchDate), TIME_ZONE)
  return result === null && matchDateObj <= now
}

// 응원 팀 확인 판단 함수
function isSupportingTeam({
  userTeam,
  homeTeam,
  awayTeam,
}: {
  userTeam: TeamKey
  homeTeam: TeamKey
  awayTeam: TeamKey
}) {
  return userTeam === homeTeam || userTeam === awayTeam
}
