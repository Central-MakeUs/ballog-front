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
    <div style={{ width: 260, maxWidth: '100%' }}>
      <HomeCard.Root>
        <HomeCard.DetailInfo
          dateTime="18:30"
          homeTeam="DOOSAN_BEARS"
          awayTeam="HANWHA_EAGLES"
        />
        <HomeCard.StadiumInfo stadium="JAMSIL" />
      </HomeCard.Root>
    </div>
  ),
}

export const HasButton: Story = {
  render: () => (
    <div style={{ width: 260, maxWidth: '100%' }}>
      <HomeCard.Root>
        <HomeCard.DetailInfo
          dateTime="18:30"
          homeTeam="DOOSAN_BEARS"
          awayTeam="HANWHA_EAGLES"
        />
        <HomeCard.StadiumInfo stadium="JAMSIL" />
        <div className="w-full">
          <Button className="w-full bg-brand-secondary-default">
            감정 남기기
          </Button>
        </div>
      </HomeCard.Root>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 260, height: '800px' }}>
      <HomeCard.Disabled>
        <Button variant="secondary" size="sm" className="rounded-lg p-3 w-full">
          <span className="body-md-medium">관람로그 보기</span>
        </Button>
      </HomeCard.Disabled>
    </div>
  ),
}
