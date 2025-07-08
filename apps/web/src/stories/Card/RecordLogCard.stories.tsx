import type { Meta, StoryObj } from '@storybook/react-vite'
import { RecordLogCard } from '@/shared/ui/common/Card/RecordLogCard'

const meta: Meta<typeof RecordLogCard.WithRecord> = {
  title: 'Components/Card/RecordLogCard',
  component: RecordLogCard.WithRecord,
  tags: ['autodocs'],
  argTypes: {
    homeTeam: {
      control: 'text',
      description: '홈 팀 이름',
      defaultValue: 'LG 트윈스',
    },
    awayTeam: {
      control: 'text',
      description: '원정 팀 이름',
      defaultValue: 'SSG 랜더스',
    },
    stadium: {
      control: 'text',
      description: '경기장 이름',
      defaultValue: '잠실야구장',
    },
    date: {
      control: 'text',
      description: '경기 일시',
      defaultValue: '2025.07.09 18:30',
    },
    matchesResult: {
      control: { type: 'radio' },
      options: ['win', 'lose', 'draw'],
      description: '경기 결과',
      defaultValue: 'lose',
    },
  },
}

export default meta
type Story = StoryObj

export const Test: Story = {
  name: 'test',
  args: {
    homeTeam: 'LG 트윈스',
    awayTeam: 'SSG 랜더스',
    stadium: '잠실야구장',
    date: '2025.07.09 (수) 오후 6:30',
    matchesResult: 'lose',
  },
}

export const WithRecord: Story = {
  render: () => (
    <div style={{ height: '200px' }}>
      <RecordLogCard.WithRecord
        homeTeam="LG 트윈스"
        awayTeam="SSG 랜더스"
        stadium="잠실야구장"
        date="2025.07.09 18:30"
        matchesResult="lose"
      />
    </div>
  ),
}

export const NoRecord: Story = {
  render: () => (
    <div style={{ height: '200px' }}>
      {' '}
      <RecordLogCard.NoRecord />
    </div>
  ),
}
