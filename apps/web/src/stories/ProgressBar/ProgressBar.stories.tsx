import type { Meta, StoryObj } from '@storybook/react-vite'

import { ProgressBar } from '@/shared/ui/common/ProgressBar/ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    emotion: {
      control: { type: 'radio' },
      options: ['joy', 'angry'],
    },
    emotionPercent: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const JoyDominant: Story = {
  args: {
    emotion: 'joy',
    emotionPercent: 80,
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
    emotion: 'angry',
    emotionPercent: 75,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '2rem', background: '#000000' }}>
        <Story />
      </div>
    ),
  ],
}
