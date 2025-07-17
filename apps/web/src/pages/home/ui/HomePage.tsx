import { AppScreen } from '@stackflow/plugin-basic-ui'

import { GlobalNavigationBar } from '@/widgets/navigation'
import { MatchSection } from '@/features/match/ui/MatchSection'
import type { ActivityComponentType } from '@stackflow/react'
import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg?react'
import { useQuery } from '@tanstack/react-query'
import { matches } from '@/entities/match/api/match.queries'
import { MatchEmptySection } from '@/features/match/ui/MatchEmptySection'
import { Loading } from '@/shared/ui/common'

const HomePage: ActivityComponentType = () => {
  const { data, isLoading } = useQuery(matches.today())

  const isEmpty = !data?.data || data.data.length === 0

  const HomeContent = () => {
    if (isLoading) return <Loading text="오늘의 경기를 불러오는 중..." />
    return isEmpty ? (
      <MatchEmptySection />
    ) : (
      <MatchSection matches={data.data} />
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
