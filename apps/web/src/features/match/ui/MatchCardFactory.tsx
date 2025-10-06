import { MatchCardToday, MatchCardFuture, MatchCardPast } from '@/entities/match/ui/MatchCard'
import { type Match } from '@/entities/match/model/match.type'
import { useDate } from '@/features/calendar/context/DateContext'

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

  const todayStr = todayDate.toISOString().slice(0, 10)
  const selectedStr = selectedDate?.toISOString().slice(0, 10)

  const isPast = selectedStr < todayStr
  const isFuture = selectedStr > todayStr

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
