import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Calendar } from '@/features/calendar/ui/calendar'

// Storybook 메타 정보
const meta: Meta<typeof Calendar> = {
  title: 'Shared/Common/Calendar',
  component: Calendar,
  tags: ['autodocs'], // Storybook 7+에서 autodocs 사용 가능
  args: {
    showOutsideDays: true,
    captionLayout: 'label',
  },
}
export default meta

type Story = StoryObj<typeof Calendar>

// 기본 달력
export const Default: Story = {}

const DefaultCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
    />
  )
}

export const WithDropdown: Story = {
  render: () => <DefaultCalendar />,
}
