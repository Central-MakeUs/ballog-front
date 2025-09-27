import { addDays, startOfWeek } from 'date-fns'

function getWeekDates(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 0 })
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

export const CalendarWeekHeader = ({
  date,
  selectedDate,
  onSelect,
}: {
  date: Date
  selectedDate: Date | null
  onSelect: (d: Date) => void
}) => {
  const weekDates = getWeekDates(date)

  return (
    <div className="grid grid-cols-7 gap-2 text-center py-2 px-4">
      {weekDates.map((d) => {
        const isSelected =
          selectedDate && d.toDateString() === selectedDate.toDateString()
        const isToday = d.toDateString() === new Date().toDateString()
        const isActive = isSelected || (!selectedDate && isToday)

        return (
          <div
            key={d.toISOString()}
            onClick={() => onSelect(d)}
            className="flex flex-col items-center"
          >
            <span
              className={`body-sm-light ${
                isActive ? 'text-usage-text-default' : 'text-brand-neutral-70'
              }`}
            >
              {d.toLocaleDateString('ko-KR', { weekday: 'short' })}
            </span>
            <span
              className={`mt-1 body-md-bold ${
                isActive ? 'text-usage-text-default' : 'text-brand-neutral-70'
              }`}
            >
              {d.getDate()}
            </span>
          </div>
        )
      })}
    </div>
  )
}
