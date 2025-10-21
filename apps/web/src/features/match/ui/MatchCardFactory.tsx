import {
  MatchCardToday,
  MatchCardFuture,
  MatchCardPast,
} from '@/entities/match/ui/MatchCard'
import { type Match } from '@/entities/match/model/match.type'
import { useDate } from '@/features/calendar/context/DateContext'

import { formatDate } from '../utils/matchUtils'

interface MatchCardFactoryProps {
  match: Match
  isCenter: boolean
  onClick?: () => void
}

export const MatchCardFactory = ({
  match,
  isCenter,
  onClick,
}: MatchCardFactoryProps) => {
  const { todayDate, selectedDate } = useDate()

  if (!selectedDate) return null

  const formatedtodayDate = formatDate(todayDate)
  const formatedselectedDate = formatDate(selectedDate)

  const isPast = formatedselectedDate < formatedtodayDate
  const isFuture = formatedselectedDate > formatedtodayDate

  // 이전 경기
  if (isPast) {
    return <MatchCardPast {...match} />
  }

  // 미래 경기
  if (isFuture) {
    return <MatchCardFuture {...match} onClick={onClick} />
  }

  // 오늘 경기일
  return <MatchCardToday {...match} isCenter={isCenter} onClick={onClick} />
}
