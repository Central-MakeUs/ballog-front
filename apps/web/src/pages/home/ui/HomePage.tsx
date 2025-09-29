import { AppScreen } from '@stackflow/plugin-basic-ui'
import type { ActivityComponentType } from '@stackflow/react'
import { useQuery } from '@tanstack/react-query'

import { matches } from '@/entities/match/api/match.queries'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { MatchSection } from '@/features/match/ui/MatchSection'
import { MatchEmptySection } from '@/features/match/ui/MatchEmptySection'
import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg?react'
import { Loading } from '@/shared/ui/common'
import { useFcmToken } from '@/features/fcm/hooks/useFcmToken'
import { useCheckSignupFinished } from '@/features/auth/hooks/useCheckSignupFinished'
import { CalendarHeader } from '@/features/calendar/ui/CalendarHeader'

const HomePage: ActivityComponentType = () => {
  useFcmToken()
  useCheckSignupFinished()
  const { data, isLoading } = useQuery(matches.today())

  const isEmpty = !data?.data || data.data.length === 0

  const HomeContent = () => {
    if (isLoading)
      return (
        <div className="flex items-center justify-center h-full">
          <Loading text="오늘의 경기를 불러오는 중..." />
        </div>
      )
    return (
      <div>
        <CalendarHeader />
        {isEmpty ? <MatchEmptySection /> : <MatchSection matches={data.data} />}
      </div>
    )
  }

  return (
    <AppScreen appBar={{ title: <WhiteBallogLogo /> }}>
      <HomeContent />
      <GlobalNavigationBar />
    </AppScreen>
  )
}

export default HomePage
