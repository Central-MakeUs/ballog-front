import type { Meta, StoryObj } from '@storybook/react-vite'
import { GlobalNavigationBar } from '@/widgets/navigation'

const meta: Meta<typeof GlobalNavigationBar> = {
  title: 'GlobalNavigationBar',
  component: GlobalNavigationBar,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof GlobalNavigationBar>

export const Default: Story = {
  render: () => <GlobalNavigationBar />,
}
