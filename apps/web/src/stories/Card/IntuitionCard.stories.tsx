import type { Meta, StoryObj } from '@storybook/react-vite'
import { IntuitionCard } from '@/shared/ui/common/Card/intuitionCard'

const meta: Meta<typeof IntuitionCard.Active> = {
  title: 'Components/IntuitionCard',
  component: IntuitionCard.Active,
  tags: ['autodocs'],
}

export default meta

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
