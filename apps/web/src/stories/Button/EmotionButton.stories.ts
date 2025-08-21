import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { EmotionButton } from '@/shared/ui/common/Button/EmotionButton'

const meta = {
  title: 'Components/Button/EmotionButton',
  component: EmotionButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '감정 버튼 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    emotionType: {
      control: 'select',
      options: ['joy', 'angry'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof EmotionButton>

export default meta
type Story = StoryObj<typeof meta>

const mockLottieRef = { current: null };
const mockPeerRef = { current: null };

export const Joy: Story = {
  args: {
    emotionType: 'joy',
    scale: 50,
    percent: 50,
    lottieRef: mockLottieRef,
    peerRef: mockPeerRef,
  },
}

export const Angry: Story = {
  args: {
    emotionType: 'angry',
    scale: 50,
    percent: 50,
    lottieRef: mockLottieRef,
    peerRef: mockPeerRef,
  },
}
