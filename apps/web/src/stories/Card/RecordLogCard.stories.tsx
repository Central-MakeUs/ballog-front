import type { Meta, StoryObj } from '@storybook/react-vite'

import { RecordLogCard } from '@/features/record/ui/RecordLogCard'
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
        homeTeam="LG 트윈스"
        awayTeam="SSG 랜더스"
        stadium="잠실야구장"
        date="2025.07.09 (수) 오후 6:30"
      />
      <RecordLogCard.Badge result="win" />
      <RecordLogCard.Footer onClick={() => alert('클릭')}>
        경기 결과 보러가기
      </RecordLogCard.Footer>
    </RecordLogCard.Root>
  ),
  name: 'WithRecord',
}

export const NoRecord: Story = {
  render: () => (
    <RecordLogCard.Empty>
      <Button className="rounded-large px-6 bg-brand-secondary-default">
        첫 직관 기록하기
      </Button>
    </RecordLogCard.Empty>
  ),
  name: 'NoRecord',
}
