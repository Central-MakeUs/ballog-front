import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmotionVoteWidget } from '@/widgets/emotionVoteWidget/EmotionVoteWidget'

const meta: Meta<typeof EmotionVoteWidget> = {
  title: 'Widgets/EmotionVoteWidget',
  component: EmotionVoteWidget,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof EmotionVoteWidget>

export const Default: Story = {
  args: {
    className: 'w-[360px] h-[180px]',
  },
}
