import type { Meta, StoryObj } from '@storybook/react-vite'

import { ProgressBar } from '@/shared/ui/common/ProgressBar/ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    positiveEmotionPercent: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    negativeEmotionPercent: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const JoyDominant: Story = {
  args: {
    positiveEmotionPercent: 80,
    negativeEmotionPercent: 20,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '2rem', background: '#000000' }}>
        <Story />
      </div>
    ),
  ],
}

export const AngryDominant: Story = {
  args: {
    positiveEmotionPercent: 75,
    negativeEmotionPercent: 25,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '2rem', background: '#000000' }}>
        <Story />
      </div>
    ),
  ],
}
