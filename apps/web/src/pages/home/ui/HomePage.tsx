import { AppScreen } from '@stackflow/plugin-basic-ui'
import type { ActivityComponentType } from '@stackflow/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { addMonths } from 'date-fns'

import { matches } from '@/entities/match/api/match.queries'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { MatchSection } from '@/features/match/ui/MatchSection'
import { MatchEmptySection } from '@/features/match/ui/MatchEmptySection'
import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg?react'
import { Loading } from '@/shared/ui/common'
import { useFcmToken } from '@/features/fcm/hooks/useFcmToken'
import { useCheckSignupFinished } from '@/features/auth/hooks/useCheckSignupFinished'
import { Calendar } from '@/shared/ui/common/calendar'
import { CalendarHeader } from '@/features/match/ui/CalendarHeader'

const HomePage: ActivityComponentType = () => {
  useFcmToken()
  useCheckSignupFinished()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState(new Date())
  const { data, isLoading } = useQuery(matches.today()) // 지워야 함

  const isEmpty = !data?.data || data.data.length === 0

  const HomeContent = () => {
    if (isLoading)
      return (
        <div className="flex items-center justify-center h-full">
          <Loading text="오늘의 경기를 불러오는 중..." />
        </div>
      )
    return isEmpty ? (
      <div>
        <CalendarHeader
          month={month}
          onPrev={() => setMonth(addMonths(month, -1))}
          onNext={() => setMonth(addMonths(month, 1))}
        />
        <MatchEmptySection />
      </div>
    ) : (
      // <Calendar
      //   mode="single"
      //   selected={date}
      //   onSelect={setDate}
      //   className="rounded-lg border"
      // />
      <div>
        <CalendarHeader
          month={month}
          onPrev={() => setMonth(addMonths(month, -1))}
          onNext={() => setMonth(addMonths(month, 1))}
        />
        <MatchSection matches={data.data} />
      </div>

      // <Calendar
      //   mode="single"
      //   selected={date}
      //   onSelect={setDate}
      //   className="rounded-lg border"
      // />
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
