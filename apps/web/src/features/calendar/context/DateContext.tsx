import { toZonedTime } from 'date-fns-tz'
import { createContext, useContext, useState, type ReactNode } from 'react'

const timeZone = 'Asia/Seoul'

interface DateContextValue {
  todayDate: Date
  selectedDate: Date | null
  setSelectedDate: (d: Date | null) => void
}

const DateContext = createContext<DateContextValue | undefined>(undefined)

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const todayDate = toZonedTime(new Date(), timeZone)
  const [selectedDate, setSelectedDate] = useState<Date | null>(todayDate)

  return (
    <DateContext.Provider value={{ todayDate, selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  )
}

export const useDate = () => {
  const ctx = useContext(DateContext)
  if (!ctx) throw new Error('useCalendar must be used within DateProvider')
  return ctx
}
