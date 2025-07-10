import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { GNBButton } from '@/shared/ui/common/Button/GNBButton'
import { BallogLogo } from '@/assets/BallogLogo'

const meta = {
  title: 'Components/Button/GNBButton',
  component: GNBButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'GNB 버튼 컴포넌트입니다.',
      },
    },
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
