import CalendarIcon from '@/assets/calendar.svg?react'
import LeftArrow from '@/assets/calendarLeftArrow.svg?react'
import RightArrow from '@/assets/calendarRightArrow.svg?react'

export const CalendarHeader = ({
  month,
  onPrev,
  onNext,
}: {
  month: Date
  onPrev: () => void
  onNext: () => void
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-1">
      <div className="flex flex-1 items-center justify-center gap-4">
        <button onClick={onPrev}>
          <LeftArrow className="size-5.5" />
        </button>
        <span className="heading-md-bold">
          {month.getFullYear()}.{String(month.getMonth() + 1).padStart(2, '0')}
        </span>
        <button onClick={onNext}>
          <RightArrow className="size-5.5" />
        </button>
      </div>

      {/* 우측: 캘린더 아이콘 */}
      <CalendarIcon className="size-6 absolute right-6" />
    </div>
  )
}
