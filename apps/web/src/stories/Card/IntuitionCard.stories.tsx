import type { Meta, StoryObj } from '@storybook/react-vite'

import { IntuitionCard } from '@/shared/ui/common/Card/intuitionCard'

const meta: Meta<typeof IntuitionCard.Active> = {
  title: 'Components/Card/IntuitionCard',
  component: IntuitionCard.Active,
  tags: ['autodocs'],
  argTypes: {
    matchCount: {
      control: 'number',
      description: '관람 경기 수',
      defaultValue: 5,
    },
    winRate: {
      control: 'number',
      description: '승률 (0~100)',
      defaultValue: 80.5,
    },
  },
}

export default meta

export const Test: StoryObj<typeof IntuitionCard.Active> = {
  name: 'test',
  args: {
    matchCount: 5,
    winRate: 80.5,
  },
}

export const Active: StoryObj<typeof IntuitionCard.Active> = {
  name: 'active',
  render: () => <IntuitionCard.Active matchCount={5} winRate={80.5} />,
}

export const Disabled: StoryObj<typeof IntuitionCard.Disabled> = {
  name: 'disabled',
  render: () => (
    <div style={{ height: '200px' }}>
      <IntuitionCard.Disabled />
    </div>
  ),
}
