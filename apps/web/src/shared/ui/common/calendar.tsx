import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'
import { ko } from 'date-fns/locale'

import { cn } from '@/shared/lib/classnames'
import { Button, buttonVariants } from '@/shared/ui/common/Button/Button'
import LeftArrow from '@/assets/calendarLeftArrow.svg?react'
import RightArrow from '@/assets/calendarRightArrow.svg?react'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={ko}
      className={cn(
        'bg-usage-background-strong group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        // formatMonthDropdown: (date) =>
        //   date.toLocaleString('default', { month: 'short' }),
        formatCaption: (month, options) =>
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
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
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
          'flex border-b border-brand-neutral-50 pb-4',
          defaultClassNames.weekdays,
        ),
        weekday: cn(
          'text-usage-text-default rounded-md flex-1 font-normal text-[15px] font-400 leading-[21px]',
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
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
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
        DayButton: CalendarDayButton,
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
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

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
        'w-full aspect-square text-[15px] font-normal rounded-full text-usage-text-default',

        modifiers.outside && 'text-brand-neutral-70',
        // 선택된 날짜 스타일
        modifiers.selected
          ? 'bg-brand-primary-default'
          : 'bg-usage-background-strong',

        // 오늘 표시 (선택 안 됐을 때만 테두리 표시하고 싶다면 여기에 조건부 추가)
        modifiers.today && !modifiers.selected && defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
