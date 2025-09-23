import { useState } from 'react'
import { addDays } from 'date-fns'

import CalendarIcon from '@/assets/calendar.svg?react'
import LeftArrow from '@/assets/calendarLeftArrow.svg?react'
import RightArrow from '@/assets/calendarRightArrow.svg?react'
import { Calendar } from '@/shared/ui/common/calendar'

import { CalendarWeekHeader } from './CalendarWeekHeader'

export const CalendarHeader = ({
  month,
  onPrev,
  onNext,
}: {
  month: Date
  onPrev: () => void
  onNext: () => void
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [baseDate, setBaseDate] = useState(new Date())

  const goPrevWeek = () => setBaseDate((prev) => addDays(prev, -7))
  const goNextWeek = () => setBaseDate((prev) => addDays(prev, 7))

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-1">
        <div className="flex flex-1 items-center justify-center gap-4">
          <button onClick={onPrev}>
            <LeftArrow className="size-5.5" />
          </button>
          <span className="heading-md-bold">
            {month.getFullYear()}.
            {String(month.getMonth() + 1).padStart(2, '0')}
          </span>
          <button onClick={onNext}>
            <RightArrow className="size-5.5" />
          </button>
        </div>

        <CalendarIcon
          className="size-6 absolute right-6"
          onClick={() => setShowCalendar((prev) => !prev)}
        />
      </div>
      <div
        className="overflow-hidden"
        onTouchStart={(e) => {
          const touchStartX = e.touches[0].clientX
          const handleTouchEnd = (endEvent: TouchEvent) => {
            const diff = endEvent.changedTouches[0].clientX - touchStartX
            if (diff > 50) goPrevWeek()
            if (diff < -50) goNextWeek()
            document.removeEventListener('touchend', handleTouchEnd)
          }
          document.addEventListener('touchend', handleTouchEnd)
        }}
      >
        <CalendarWeekHeader
          date={baseDate}
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />
      </div>
      {/* 캘린더 모달 */}
      {showCalendar && (
        <div className="absolute top-10 left-0 right-0 z-50">
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={(d) => d && setSelectedDate(d)}
            className="rounded-lg border mx-auto"
          />
        </div>
      )}
    </div>
  )
}
