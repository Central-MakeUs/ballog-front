import type { Meta, StoryObj } from '@storybook/react-vite'

import { EmotionVoteWidget } from '@/pages/live-recording/ui/EmotionVoteWidget'

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
  render: (args) => (
    <div className="bg-black">
      {' '}
      <EmotionVoteWidget {...args} />
    </div>
  ),
}
