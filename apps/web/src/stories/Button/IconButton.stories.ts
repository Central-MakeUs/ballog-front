import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { IconButton } from '@/shared/ui/common/Button/IconButton'

const meta = {
  title: 'Components/Button/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '아이콘 버튼 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: ['joy', 'angry'] },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>


const lottieRef = { current: null } as const

export const Joy: Story = {
  args: {
    state: 'joy',
    lottieRef,
  },
}

export const Angry: Story = {
  args: {
    state: 'angry',
    lottieRef,
  },
}
