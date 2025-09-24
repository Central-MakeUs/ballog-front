import { useState } from 'react'
import { addMonths, endOfMonth, startOfMonth } from 'date-fns'

import CalendarIcon from '@/assets/calendar.svg?react'
import LeftArrow from '@/assets/calendarLeftArrow.svg?react'
import RightArrow from '@/assets/calendarRightArrow.svg?react'
import { Calendar } from '@/shared/ui/common/calendar'

import { CalendarWeekCarousel } from './CalendarWeekCarousel'

export const CalendarHeader = ({ month }: { month: Date }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [baseDate, setBaseDate] = useState(new Date())

  const goToPrevMonth = () => {
    const prevMonthLastDay = endOfMonth(addMonths(baseDate, -1))
    setBaseDate(prevMonthLastDay)
  }

  const goToNextMonth = () => {
    const nextMonthFirstDay = startOfMonth(addMonths(baseDate, 1))
    setBaseDate(nextMonthFirstDay)
  }

  const handleSelectDate = (d: Date) => {
    setSelectedDate(d)
    setBaseDate(d)
  }

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-1">
        <div className="flex flex-1 items-center justify-center gap-4">
          <button onClick={goToPrevMonth}>
            <LeftArrow className="size-5.5" />
          </button>
          <span className="heading-md-bold">
            {month.getFullYear()}.
            {String(month.getMonth() + 1).padStart(2, '0')}
          </span>
          <button onClick={goToNextMonth}>
            <RightArrow className="size-5.5" />
          </button>
        </div>

        <CalendarIcon
          className="size-6 absolute right-6"
          onClick={() => setShowCalendar((prev) => !prev)}
        />
      </div>

      {/* week 캐러셀 */}
      <CalendarWeekCarousel
        onChange={setBaseDate}
        selectedDate={selectedDate}
        onSelect={handleSelectDate}
      />

      {/* 캘린더 모달 */}
      {showCalendar && (
        <div className="absolute top-10 left-0 right-0 z-50">
          <Calendar
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={(d) => {
              d && setSelectedDate(d)
            //   setShowCalendar(false)  << 이거 해야하는건지?
            }}
            className="rounded-lg border mx-auto"
          />
        </div>
      )}
    </div>
  )
}
