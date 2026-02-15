import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import { format } from 'date-fns-tz'
import {
  CalendarLeftArrow as LeftArrow,
  CalendarRightArrow as RightArrow,
} from '@ballog/asset/icons'

import type { MatchDateMap } from '@/entities/match/model/match.type'
import { TIME_ZONE } from '@/shared/constants/time'
import { cn } from '@/shared/lib/classnames'
import { Button } from '@/shared/ui/common/Button/Button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  formatters,
  components,
  allMatches,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  allMatches: MatchDateMap
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={ko}
      className={cn(
        'bg-usage-background-strong light:bg-usage-background-default group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatCaption: (month) =>
          `${month.getFullYear()} - ${String(month.getMonth() + 1).padStart(2, '0')}`,
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit border-none rounded-xlarge', defaultClassNames.root),
        months: cn(
          'flex gap-4 flex-col md:flex-row relative',
          defaultClassNames.months,
        ),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute bg-popover inset-0 opacity-0',
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          'select-none text-[18px] font-400 leading-[25.2px] text-usage-text-default',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse border-none',
        weekdays: cn(
          'flex border-b border-brand-neutral-50 light:border-brand-neutral-20 pb-4',
          defaultClassNames.weekdays,
        ),
        weekday: cn(
          'text-usage-text-default light:text-usage-text-subtle rounded-md flex-1 font-normal text-[15px] font-400 leading-[21px]',
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full first:mt-0 mt-2 pt-1', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultClassNames.week_number,
        ),
        day: cn(
          'relative w-full h-full p-0 text-center group/day aspect-square select-none',
          defaultClassNames.day,
        ),
        range_start: cn(
          'rounded-l-md bg-accent',
          defaultClassNames.range_start,
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
        today: cn(defaultClassNames.today),
        outside: cn(defaultClassNames.outside),
        disabled: cn(
          'text-muted-foreground opacity-50',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <LeftArrow className={cn('size-4', className)} {...props} />
          }

          if (orientation === 'right') {
            return <RightArrow className={cn('size-4', className)} {...props} />
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          )
        },
        DayButton: (dayButtonProps) => (
          <CalendarDayButton {...dayButtonProps} allMatches={allMatches} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  allMatches,
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton> & { allMatches: MatchDateMap }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const formatted = format(day.date, 'yyyy-MM-dd', { timeZone: TIME_ZONE })
  const hasMatch = !!allMatches[formatted]?.length

  return (
    <Button
      ref={ref}
      variant="secondary"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'w-full aspect-square text-[15px] font-normal rounded-full',

        modifiers.selected
          ? '!bg-brand-primary-subtle text-[#17A093] border-brand-primary-default border-[1px]'
          : hasMatch
            ? 'dark:bg-usage-background-strong light:bg-white text-usage-text-default'
            : 'dark:bg-usage-background-strong light:bg-white text-brand-neutral-40',

        modifiers.outside &&
          'text-brand-neutral-70 light:text-brand-neutral-40',
        modifiers.today && !modifiers.selected && defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
