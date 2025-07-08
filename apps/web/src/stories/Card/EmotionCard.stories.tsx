import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmotionCard } from '@/shared/ui/common/Card/EmotionCard'

const meta: Meta<typeof EmotionCard.Active> = {
  title: 'Components/EmotionCard',
  component: EmotionCard.Active,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmotionCard.Active>

export const Active_Mad: Story = {
  render: () => (
    <div style={{ height: '200px' }}>
      <EmotionCard.Active emotion="화나요" rate={75} />
    </div>
  ),
  name: 'Active - 화나요',
}

export const Active_Happy: Story = {
  render: () => (
    <div style={{ height: '200px' }}>
      <EmotionCard.Active emotion="기뻐요" rate={60} />
    </div>
  ),
  name: 'Active - 기뻐요',
}

export const Disabled: Story = {
  render: () => (
    <div style={{ height: '200px' }}>
      <EmotionCard.Disabled />
    </div>
  ),
  name: 'Disabled',
}
