import type { Meta, StoryObj } from '@storybook/react-vite'
import { List } from '@/shared/ui/common/List'

const meta: Meta<typeof List.Root> = {
  title: 'shared/List',
  component: List.Root,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof List.Root>

// 텍스트 + 화살표
export const WithArrow: Story = {
  render: () => (
    <List.Root>
      <List.Text>응원 팀 변경</List.Text>
      <List.Arrow />
    </List.Root>
  ),
}

// 텍스트 + 스위치
export const WithSwitch: Story = {
  render: () => (
    <List.Root>
      <List.Text>푸시 알림</List.Text>
      <List.SwitchItem />
    </List.Root>
  ),
}
