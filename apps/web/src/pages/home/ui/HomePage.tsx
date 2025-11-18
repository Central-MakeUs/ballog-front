import { AppScreen } from '@stackflow/plugin-basic-ui'
import { type ActivityComponentType, useActivity } from '@stackflow/react'
import { useQuery } from '@tanstack/react-query'
import { format, toZonedTime } from 'date-fns-tz'
import { isBefore, isAfter, isToday } from 'date-fns'

import { matches } from '@/entities/match/api/match.queries'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { MatchSection } from '@/features/match/ui/MatchSection'
import { MatchEmptySection } from '@/features/match/ui/MatchEmptySection'
import { MatchLoadingSection } from '@/features/match/ui/MatchLoadingSection'
import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg?react'
import { useFcmToken } from '@/features/fcm/hooks/useFcmToken'
import { useCheckSignupFinished } from '@/features/auth/hooks/useCheckSignupFinished'
import { CalendarHeader } from '@/features/calendar/ui/CalendarHeader'
import { useDate, DateProvider } from '@/features/calendar/context/DateContext'
import { TIME_ZONE } from '@/shared/constants/time'

const HomeContent = () => {
  const { selectedDate } = useDate()
  const { transitionState } = useActivity()

  console.log(transitionState)
  const formattedDate = selectedDate
    ? format(selectedDate, 'yyyy-MM-dd', { timeZone: TIME_ZONE })
    : ''

  const { data, isLoading } = useQuery(matches.all())

  const allMatches = data?.data ?? {}
  const todayMatchesList = data?.data?.[formattedDate] ?? []
  const isEmpty = todayMatchesList.length === 0

  const today = toZonedTime(new Date(), TIME_ZONE)

  let dateType: 'past' | 'today' | 'future' | null = null

  if (selectedDate) {
    if (isToday(selectedDate)) dateType = 'today'
    else if (isBefore(selectedDate, today)) dateType = 'past'
    else if (isAfter(selectedDate, today)) dateType = 'future'
  }

  return (
    <div>
      <CalendarHeader allMatches={allMatches} />
      {isLoading ? (
        <MatchLoadingSection />
      ) : isEmpty ? (
        <MatchEmptySection />
      ) : (
        <MatchSection matches={todayMatchesList} dateType={dateType} />
      )}
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
