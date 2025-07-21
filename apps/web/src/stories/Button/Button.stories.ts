import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Button } from '@/shared/ui/common/Button/Button'

const meta = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '기본 버튼 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    state: {
      control: 'select',
      options: ['subtle', 'default', 'hover', 'pressed', 'disabled'],
    },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    buttonType: {
      control: 'select',
      options: ['filled', 'outline', 'naked'],
    },
    disabled: { control: 'boolean' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}
