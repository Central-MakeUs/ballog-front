import type { Meta, StoryObj } from '@storybook/react-vite'

import { Chip } from '@/shared/ui/common/Chip/Chip'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'red', 'green'],
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'subtle'],
    },
    className: {
      control: false,
    },
    children: {
      control: { type: 'text' },
    },
  },
  args: {
    variant: 'primary',
    state: 'default',
    children: 'Chip',
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Test: Story = {}
