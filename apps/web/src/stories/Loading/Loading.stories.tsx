import type { Meta, StoryObj } from '@storybook/react-vite'

import { Loading } from '@/shared/ui/common'

const meta: Meta<typeof Loading> = {
  title: 'Common/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    text: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    text: '로딩 중...',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    text: '처리 중...',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    text: '데이터를 불러오는 중...',
  },
}

export const CustomText: Story = {
  args: {
    size: 'md',
    text: '오늘의 경기를 불러오는 중...',
  },
}

export const WithoutText: Story = {
  args: {
    size: 'md',
    text: '',
  },
}
