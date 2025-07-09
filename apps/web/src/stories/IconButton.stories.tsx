import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { IconButton } from '@/shared/ui/common/Button/IconButton'

const meta = {
  title: 'IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['joy', 'angry'] },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Joy: Story = {
  args: {
    state: 'joy',
  },
}

export const Angry: Story = {
  args: {
    state: 'angry',
  },
}
