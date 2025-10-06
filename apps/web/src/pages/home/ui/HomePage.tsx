import { AppScreen } from '@stackflow/plugin-basic-ui'
import type { ActivityComponentType } from '@stackflow/react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns-tz'

import { matches } from '@/entities/match/api/match.queries'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { MatchSection } from '@/features/match/ui/MatchSection'
import { MatchEmptySection } from '@/features/match/ui/MatchEmptySection'
import { MatchLoadingSection } from '@/features/match/ui/MatchLoadingSection'
import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg?react'
import { useFcmToken } from '@/features/fcm/hooks/useFcmToken'
import { useCheckSignupFinished } from '@/features/auth/hooks/useCheckSignupFinished'
import { CalendarHeader } from '@/features/calendar/ui/CalendarHeader'
import { useDate } from '@/features/calendar/context/DateContext'

const HomeContent = () => {
  const { selectedDate } = useDate()

  const formattedDate = selectedDate
    ? format(selectedDate, 'yyyy-MM-dd', { timeZone: 'Asia/Seoul' })
    : ''

  const { data, isLoading } = useQuery(matches.bySelectedDate(formattedDate))

  const matchesList = data?.data?.[formattedDate] ?? []
  const isEmpty = matchesList.length === 0

  return (
    <div>
      <CalendarHeader />
      {isLoading ? (
        <MatchLoadingSection />
      ) : isEmpty ? (
        <MatchEmptySection />
      ) : (
        <MatchSection matches={matchesList} />
      )}
    </div>
  )
}

const HomePage: ActivityComponentType = () => {
  useFcmToken()
  useCheckSignupFinished()

  return (
    <AppScreen appBar={{ title: <WhiteBallogLogo /> }}>
      <HomeContent />
      <GlobalNavigationBar />
    </AppScreen>
  )
}

export default HomePage
