import type { Meta, StoryObj } from '@storybook/react-vite'
import { IntuitionCard } from '@/shared/ui/common/Card/intuitionCard'

const meta: Meta<typeof IntuitionCard> = {
  title: 'Components/IntuitionCard',
  component: IntuitionCard,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof IntuitionCard>

export const Active: Story = {
  args: {
    state: 'active',
    matchCount: 15,
    winRate: 66.7,
  },
}

export const Disabled: Story = {
  args: {
    state: 'disabled',
  },
}
