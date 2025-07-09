import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { GNBButton } from '@/shared/ui/common/Button/GNBButton'
import { BallogLogo } from '@/assets/BallogLogo'

const meta = {
  title: 'GNBButton',
  component: GNBButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof GNBButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    active: false,
    children: '홈',
    icon: BallogLogo,
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
}
