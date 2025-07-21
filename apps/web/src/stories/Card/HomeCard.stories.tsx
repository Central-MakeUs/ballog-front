import type { Meta, StoryObj } from '@storybook/react-vite'

import { HomeCard } from '@/shared/ui/common/Card/HomeCard/index'
import { Button } from '@/shared/ui/common/Button'

const meta: Meta<typeof HomeCard.Root> = {
  title: 'Components/Card/HomeCard',
  component: HomeCard.Root,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof HomeCard.Root>

export const Default: Story = {
  render: () => (
    <HomeCard.Root>
      <HomeCard.MatchInfo homeTeam="LOTTE_GIANTS" awayTeam="KT_WIZ" />
      <HomeCard.DetailInfo stadium="잠실 경기장" dateTime="2025.06.18 17:30" />
    </HomeCard.Root>
  ),
}

export const HasButton: Story = {
  render: () => (
    <HomeCard.Root>
      <HomeCard.MatchInfo homeTeam="LOTTE_GIANTS" awayTeam="KT_WIZ" />
      <HomeCard.DetailInfo stadium="잠실 경기장" dateTime="2025.06.18 17:30">
        <Button>기록 시작하기</Button>
      </HomeCard.DetailInfo>
    </HomeCard.Root>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ height: '500px' }}>
      <HomeCard.Disabled>
        <Button size="lg">기록 시작하기</Button>
      </HomeCard.Disabled>
    </div>
  ),
}
