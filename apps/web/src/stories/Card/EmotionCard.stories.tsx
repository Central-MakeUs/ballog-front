import type { Meta, StoryObj } from '@storybook/react-vite'

import { EmotionCard } from '@/shared/ui/common/Card/EmotionCard'

const meta: Meta<typeof EmotionCard.Active> = {
  title: 'Components/Card/EmotionCard',
  component: EmotionCard.Active,
  tags: ['autodocs'],
  args: {
    data: [
      { name: '화나요', value: 50 },
      { name: '기뻐요', value: 50 },
    ],
  },
  argTypes: {
    data: {
      control: { type: 'object' },
    },
  },
}

export default meta
type Story = StoryObj<typeof EmotionCard.Active>

export const Test: Story = {
  name: 'test',
  args: {
    data: [
      { name: '화나요', value: 50 },
      { name: '기뻐요', value: 50 },
    ],
  },
}

export const Active_Mad: Story = {
  render: () => (
    <div style={{ height: '200px' }}>
      <EmotionCard.Active
        data={[
          { name: '화나요', value: 50 },
          { name: '기뻐요', value: 50 },
        ]}
      />
    </div>
  ),
  name: 'Active - 화나요',
}

export const Active_Happy: Story = {
  render: () => (
    <div style={{ height: '200px' }}>
      <EmotionCard.Active
        data={[
          { name: '화나요', value: 50 },
          { name: '기뻐요', value: 50 },
        ]}
      />
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
