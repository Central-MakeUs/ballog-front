import type { Meta, StoryObj } from '@storybook/react-vite'

import { RecordingCard } from '@/entities/record/ui/RecordingCard/index'
import { Profile } from '@/shared/ui/common/Profile/Profile'
import DefaultProfile from '@/assets/defaultProfile.png'

const meta: Meta<typeof RecordingCard.Root> = {
  title: 'Components/Card/RecordingCard',
  component: RecordingCard.Root,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RecordingCard.Root>

export const Default: Story = {
  name: 'Default',
  render: () => (
    <RecordingCard.Root>
      <RecordingCard.Icon state="default" onClick={() => alert('클릭')} />
      <RecordingCard.Info
        homeTeam="LG 트윈스"
        awayTeam="SSG 랜더스"
        stadium="잠실야구장"
        date="2025.07.10"
      />
    </RecordingCard.Root>
  ),
}

export const Active: Story = {
  name: 'Active',
  render: () => (
    <RecordingCard.Root>
      <Profile imgSrc={DefaultProfile} border={true} />
      <RecordingCard.Info
        homeTeam="한화 이글스"
        awayTeam="롯데 자이언츠"
        stadium="이글스파크"
        date="2025.07.11"
      />
    </RecordingCard.Root>
  ),
}
