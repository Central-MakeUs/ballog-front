import { cn } from '@/shared/lib/classnames'

interface CalendarWeekButtonProps {
  date: Date
  isActive: boolean
  clickable: boolean
  onSelect: (d: Date) => void
}

export const CalendarWeekButton = ({
  date,
  isActive,
  clickable,
  onSelect,
}: CalendarWeekButtonProps) => {
  return (
    <button
      disabled={!clickable}
      onClick={() => onSelect(date)}
      className="flex flex-col items-center"
    >
      <span
        className={cn(
          'body-sm-bold',
          isActive
            ? 'text-brand-primary-default'
            : clickable
              ? 'text-usage-text-default'
              : 'text-brand-neutral-40 light:text-brand-neutral-70',
        )}
      >
        {date.toLocaleDateString('ko-KR', { weekday: 'short' })}
      </span>

      <span
        className={cn(
          'mt-1 body-md-bold',
          isActive
            ? 'text-brand-primary-default'
            : clickable
              ? 'text-usage-text-default'
              : 'text-brand-neutral-70',
        )}
      >
        {date.getDate()}
      </span>
    </button>
  )
}
