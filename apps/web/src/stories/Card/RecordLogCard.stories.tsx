import type { Meta, StoryObj } from '@storybook/react-vite'

import { RecordLogCard } from '@/entities/record/ui/RecordLogCard'
import { Button } from '@/shared/ui/common'

const meta: Meta<typeof RecordLogCard.Root> = {
  title: 'Components/Card/RecordLogCard',
  component: RecordLogCard.Root,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const WithRecord: Story = {
  render: () => (
    <RecordLogCard.Root>
      <RecordLogCard.Info
        homeTeam="LG_TWINS"
        awayTeam="SSG_LANDERS"
        stadium="JAMSIL"
        date="2025.07.09 (수) 오후 6:30"
        result="WIN"
      />
      <RecordLogCard.Badge result="WIN" />
      <RecordLogCard.Action />
    </RecordLogCard.Root>
  ),
  name: 'WithRecord',
}

export const NoRecord: Story = {
  render: () => (
    <RecordLogCard.Empty>
      <Button className="rounded-large px-6 bg-brand-secondary-default">
        첫 관람 기록하기
      </Button>
    </RecordLogCard.Empty>
  ),
  name: 'NoRecord',
}
