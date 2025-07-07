import type { Meta, StoryObj } from '@storybook/react-vite'
import { HomeCard } from '@/shared/ui/common/Card/homeCard'

interface HomeCardProps {
  homeTeam: string
  awayTeam: string
  stadium: string
  dateTime: string
  state?: 'default' | 'disabled'
  onClick?: () => void
}

const meta: Meta<HomeCardProps> = {
  title: 'Components/HomeCard',
  component: HomeCard,
  tags: ['autodocs'],
  args: {
    homeTeam: '롯데 자이언츠',
    awayTeam: 'KT 위즈',
    stadium: '잠실 경기장',
    dateTime: '2025.06.18 17:30',
    state: 'default',
  },
}

export default meta

type Story = StoryObj<HomeCardProps>

export const Default: Story = {
  args: {
    state: 'default',
  },
}

export const Disabled: Story = {
  args: {
    state: 'disabled',
  },
}
