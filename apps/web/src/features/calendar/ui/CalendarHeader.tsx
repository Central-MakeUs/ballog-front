import { useState, useEffect, useRef } from 'react'
import { addMonths, endOfMonth, startOfMonth } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import { toZonedTime } from 'date-fns-tz'

import CalendarIcon from '@/assets/calendar.svg?react'
import LeftArrow from '@/assets/calendarLeftArrow.svg?react'
import RightArrow from '@/assets/calendarRightArrow.svg?react'
import { Calendar } from '@/shared/ui/common/calendar'
import { useTomorrowTrigger } from '@/features/calendar/hooks/useTomorrowTrigger'
import { Button } from '@/shared/ui/common'
import { TIME_ZONE } from '@/shared/constants/time'

import { useDate } from '../context/DateContext'

import { CalendarWeekCarousel } from './CalendarWeekCarousel'

export const CalendarHeader = () => {
  const koreaDate = toZonedTime(new Date(), TIME_ZONE)

  const { selectedDate, setSelectedDate } = useDate()

  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [baseDate, setBaseDate] = useState(koreaDate)
  const calendarRef = useRef<HTMLDivElement>(null)

  useTomorrowTrigger({
    onTomorrow: (newDate) => {
      setSelectedDate(newDate)
      setBaseDate(newDate)
    },
  })

  const goToPrevMonth = () => {
    const prevMonthLastDay = endOfMonth(addMonths(baseDate, -1))
    setBaseDate(prevMonthLastDay)
    setSelectedDate(prevMonthLastDay)
  }

  const goToNextMonth = () => {
    const nextMonthFirstDay = startOfMonth(addMonths(baseDate, 1))
    setBaseDate(nextMonthFirstDay)
    setSelectedDate(nextMonthFirstDay)
  }

  const handleSelectDate = (d: Date) => {
    setSelectedDate(d)
    setBaseDate(d)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('.calendar-trigger')
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
        <CalendarIcon
          className="calendar-trigger size-6 absolute left-6"
          onClick={() => setShowCalendar((prev) => !prev)}
        />
        <div className="flex flex-1 items-center justify-center gap-4">
          <button onClick={goToPrevMonth}>
            <LeftArrow className="size-5.5" />
          </button>
          <span className="heading-md-bold">
            {baseDate.getFullYear()}.
            {String(baseDate.getMonth() + 1).padStart(2, '0')}
          </span>
          <button onClick={goToNextMonth}>
            <RightArrow className="size-5.5" />
          </button>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="absolute right-4"
          onClick={() => {
            const today = toZonedTime(new Date(), TIME_ZONE)
            setSelectedDate(today)
            setBaseDate(today)
          }}
        >
          오늘
        </Button>
      </div>

      {/* week 캐러셀 */}
      <CalendarWeekCarousel
        baseDate={baseDate}
        onChange={setBaseDate}
        selectedDate={selectedDate}
        onSelect={handleSelectDate}
      />

      {/* 캘린더 모달 */}
      <div ref={calendarRef} className="relative">
        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute -top-14 left-1/2 -translate-x-1/2  z-50 bg-usage-background-strong rounded-lg shadow-lg"
            >
              <Calendar
                mode="single"
                selected={selectedDate ?? baseDate}
                defaultMonth={selectedDate ?? baseDate}
                onMonthChange={(m) => setBaseDate(m)}
                onSelect={(d) => {
                  if (!d) return
                  setSelectedDate(d)
                  setBaseDate(d)
                  setShowCalendar(false)
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
