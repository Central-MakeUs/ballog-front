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
import { DateProvider } from '@/features/calendar/context/DateContext'
import { useDate } from '@/features/calendar/context/DateContext'

const HomeContent = () => {
  const { selectedDate } = useDate()

  const formattedDate = selectedDate
    ? selectedDate.toISOString().split('T')[0]
    : ''

  const { data, isLoading } = useQuery(matches.bySelectedDate(formattedDate))

  const matchesList = data?.data?.[formattedDate] ?? []
  const isEmpty = matchesList.length === 0
  
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading text="오늘의 경기를 불러오는 중..." />
      </div>
    )
  return (
    <div>
      <CalendarHeader />
      {isEmpty ? <MatchEmptySection /> : <MatchSection matches={matchesList} />}
    </div>
  )
}

const HomePage: ActivityComponentType = () => {
  useFcmToken()
  useCheckSignupFinished()

  return (
    <AppScreen appBar={{ title: <WhiteBallogLogo /> }}>
      <DateProvider>
        <HomeContent />
        <GlobalNavigationBar />
      </DateProvider>
    </AppScreen>
  )
}

export default HomePage
