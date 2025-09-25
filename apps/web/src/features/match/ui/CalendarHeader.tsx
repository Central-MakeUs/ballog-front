import { useState, useEffect, useRef } from 'react'
import { addMonths, endOfMonth, startOfMonth } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

import CalendarIcon from '@/assets/calendar.svg?react'
import LeftArrow from '@/assets/calendarLeftArrow.svg?react'
import RightArrow from '@/assets/calendarRightArrow.svg?react'
import { Calendar } from '@/shared/ui/common/calendar'

import { CalendarWeekCarousel } from './CalendarWeekCarousel'

export const CalendarHeader = () => {
  const [month] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [baseDate, setBaseDate] = useState(new Date())
  const calendarRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
      <div className="relative">
        <AnimatePresence>
          {showCalendar && (
            <motion.div
              ref={calendarRef}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute -top-14 left-1/2 -translate-x-1/2  z-50 bg-usage-background-strong rounded-lg shadow-lg"
            >
              <Calendar
                mode="single"
                selected={selectedDate ?? undefined}
                onSelect={(d) => {
                  if (!d) return
                  setSelectedDate(d)
                  //   setShowCalendar(false)
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
