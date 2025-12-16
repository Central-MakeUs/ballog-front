import { addDays, startOfWeek } from 'date-fns'
import { format } from 'date-fns-tz'

import type { MatchDateMap } from '@/entities/match/model/match.type'
import { TIME_ZONE } from '@/shared/constants/time'

import { CalendarWeekButton } from './CalendarWeekButton'

interface CalendarWeekContentProps {
  allMatches: MatchDateMap
  date: Date
  selectedDate: Date | null
  onSelect: (d: Date) => void
}

function getWeekDates(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 0 })
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

export const CalendarWeekContent = ({
  allMatches,
  date,
  selectedDate,
  onSelect,
}: CalendarWeekContentProps) => {
  const weekDates = getWeekDates(date)

  return (
    <div className="grid grid-cols-7 gap-2 text-center py-2 px-4">
      {weekDates.map((d) => {
        const isSelected =
          selectedDate && d.toDateString() === selectedDate.toDateString()
        const isToday = d.toDateString() === new Date().toDateString()
        const isActive = isSelected || (!selectedDate && isToday)

        const formatted = format(d, 'yyyy-MM-dd', { timeZone: TIME_ZONE })
        const hasMatch = !!allMatches[formatted]?.length

        const clickable = hasMatch

        return (
          <CalendarWeekButton
            key={formatted}
            clickable={clickable}
            date={d}
            onSelect={onSelect}
            isActive={isActive}
          />
        )
      })}
    </div>
  )
}
