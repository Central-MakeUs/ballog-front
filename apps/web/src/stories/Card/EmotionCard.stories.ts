import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmotionCard } from '@/shared/ui/common/Card/emotionCard'

const meta: Meta<typeof EmotionCard> = {
  title: 'Components/EmotionCard',
  component: EmotionCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmotionCard>

export const Active: Story = {
  args: {
    state: 'active',
    emotion: '화나요',
    rate: 20,
  },
}

export const Disabled: Story = {
  args: {
    state: 'disabled',
  },
}
