import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecordLogCard } from '@/shared/ui/common/Card/RecordLogCard'

const meta: Meta<typeof RecordLogCard> = {
  title: 'Components/RecordLogCard',
  component: RecordLogCard,
  tags: ['autodocs'],
  args: {
    hasRecord: true,
    homeTeam: '롯데 자이언츠',
    awayTeam: 'KT 위즈',
    stadium: '잠실 경기장',
    date: '2025.06.18',
    matchesResult: 'win',
  },
}

export default meta

type Story = StoryObj<typeof RecordLogCard>

export const WithRecord: Story = {
  args: {
    hasRecord: true,
    homeTeam: '롯데 자이언츠',
    awayTeam: 'KT 위즈',
    stadium: '잠실 경기장',
    date: '2025.06.18',
    matchesResult: 'win',
  },
}

export const NoRecord: Story = {
  args: {
    hasRecord: false,
  },
}
