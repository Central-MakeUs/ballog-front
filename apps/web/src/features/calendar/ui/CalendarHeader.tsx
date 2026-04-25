import { useState, useEffect, useRef } from 'react'
import { addMonths, endOfMonth, startOfMonth } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import { toZonedTime, format } from 'date-fns-tz'
import {
  CalendarLeftArrow as LeftArrow,
  CalendarRightArrow as RightArrow,
} from '@ballog/asset/icons'

// import CalendarIcon from '@/assets/calendar.svg?react'
import CalendarIcon from '@/assets/CalendarIcon'
import { Calendar } from '@/features/calendar/ui/calendar'
import { useTomorrowTrigger } from '@/features/calendar/hooks/useTomorrowTrigger'
import type { MatchDateMap } from '@/entities/match/model/match.type'
import { Button } from '@/shared/ui/common'
import { TIME_ZONE } from '@/shared/constants/time'
import { cn } from '@/shared/lib/classnames'

import { useDate } from '../context/DateContext'

import { CalendarWeekCarouselV2 } from './CalendarWeekCarouselV2'

interface CalendarHeaderProps {
  allMatches: MatchDateMap
}

export const CalendarHeader = ({ allMatches }: CalendarHeaderProps) => {
  const koreaDate = toZonedTime(new Date(), TIME_ZONE)
  const { selectedDate, setSelectedDate } = useDate()

  const [showCalendar, setShowCalendar] = useState<boolean>(true)
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
          className={cn(
            'absolute calendar-trigger size-6 left-6',
            'dark:[--calendar-frame-color:theme(colors.brand.neutral.white)] dark:[--calendar-inside-color:theme(colors.brand.neutral.90)]',
            'light:[--calendar-frame-color:theme(colors.brand.neutral.50)] light:[--calendar-inside-color:theme(colors.brand.neutral.10)]',
          )}
          onClick={() => setShowCalendar((prev) => !prev)}
        />
        <div className="flex items-center justify-center flex-1 gap-4">
          <button onClick={goToPrevMonth}>
            <LeftArrow className="size-5.5" />
          </button>
          <span className="heading-md-bold text-usage-text-default">
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
          className="absolute right-4 dark:text-brand-neutral-white dark:bg-brand-secondary-pressed light:text-brand-neutral-70"
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
      <CalendarWeekCarouselV2
        allMatches={allMatches}
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
              className="absolute z-50 -translate-x-1/2 rounded-lg shadow-lg -top-14 left-1/2 bg-usage-background-strong"
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
                allMatches={allMatches}
                disabled={(date) => {
                  const formatted = format(date, 'yyyy-MM-dd', {
                    timeZone: TIME_ZONE,
                  })
                  return !allMatches[formatted]?.length
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
