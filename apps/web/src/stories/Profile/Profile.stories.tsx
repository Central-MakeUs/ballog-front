import type { Meta, StoryObj } from '@storybook/react-vite'
import { Profile } from '@/shared/ui/common/Profile/Profile'
import MockImage from '@/assets/grayExampleImage.jpg'
import DefaultProfile from '@/assets/defaultProfile.png'

const meta: Meta<typeof Profile> = {
  title: 'Components/Profile',
  component: Profile,
  args: {
    border: false,
    imgSrc: '',
  },
  argTypes: {
    border: {
      control: 'boolean',
      description: '테두리 유무',
    },
    imgSrc: {
      control: 'text',
      description: '프로필 이미지 주소. 없으면 기본 아이콘 프레임 사용',
    },
    className: {
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Profile>


export const WithBorder: Story = {
  args: {
    imgSrc: MockImage,
    border: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', height: "200px", background: 'yellow' }}>
        <Story />
      </div>
    ),
  ],
}

export const NoBorder: Story = {
  args: {
    imgSrc: MockImage,
    border: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', height: "200px", background: 'yellow' }}>
        <Story />
      </div>
    ),
  ],
}

export const DefaultImage: Story = {
  args: {
    imgSrc: DefaultProfile,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', height: "200px", background: 'yellow' }}>
        <Story />
      </div>
    ),
  ],
}