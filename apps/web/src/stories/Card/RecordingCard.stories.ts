import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecordingCard } from '@/shared/ui/common/Card/RecordingCard'

const meta: Meta<typeof RecordingCard> = {
  title: 'Components/RecordingCard',
  component: RecordingCard,
  tags: ['autodocs'],
  args: {
    homeTeam: '롯데 자이언츠',
    awayTeam: 'KT 위즈',
    stadium: '잠실 경기장',
    date: '2025.06.18',
  },
}

export default meta
type Story = StoryObj<typeof RecordingCard>

export const Default: Story = {
  args: {
    state: 'default',
  },
}

export const Active: Story = {
  args: {
    state: 'active',
  },
}
