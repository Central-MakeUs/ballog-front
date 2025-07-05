import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Modal } from '@/shared/ui/common/Modal/modal'
import { Button } from '@/shared/ui/common/Button/button'
import GrayExampleImage from '@/assets/grayExampleImage.jpg'

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['overlay', 'bottomSheet'],
      description: '모달 타입',
    },
    heading: {
      control: 'text',
      description: '모달 heading',
    },
    body: {
      control: 'text',
      description: '모달 body',
    },
    hasImg: {
      control: 'text',
      description: '이미지 URL',
    },
    hasSubText: {
      control: 'text',
      description: '서브 텍스트',
    },
    dismissible: {
      control: 'boolean',
      description: 'X 버튼 표시 여부',
    },
    open: {
      control: 'boolean',
      description: '모달 열림 상태',
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalStory = (args: any) => {
  const [open, setOpen] = useState(false)

  // 버튼 onClick 래핑
  const wrappedButtons = args.buttons
    ? {
        ...args.buttons,
        items: args.buttons.items.map((item: any) => ({
          ...item,
          onClick: () => {
            item.onClick?.()
            setOpen(false)
          },
        })),
      }
    : undefined

  return (
    <div>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <Modal
        {...args}
        open={open}
        onOpenChange={setOpen}
        buttons={wrappedButtons}
      />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <ModalStory {...args} />,
  args: {
    type: 'overlay',
    heading: 'Text Heading',
    body: 'body text',
    dismissible: false,
    buttons: {
      layout: 'horizontal',
      items: [
        { label: 'button' },
        { label: 'button' },
      ],
    },
  },
}

export const BottomSheet: Story = {
  render: (args) => <ModalStory {...args} />,
  args: {
    type: 'bottomSheet',
    heading: 'Text Heading',
    body: 'body text',
    hasSubText: 'hasSubText',
    hasImg: GrayExampleImage,
    dismissible: true,
    buttons: {
      layout: 'horizontal',
      items: [
        { label: 'button' },
        { label: 'button' },
      ],
    },
  },
}

export const WithImage: Story = {
  render: (args) => <ModalStory {...args} />,
  args: {
    type: 'overlay',
    heading: 'Text Heading',
    body: 'body text',
    hasImg: GrayExampleImage,
    dismissible: false,
  },
}

export const VerticalButtons: Story = {
  render: (args) => <ModalStory {...args} />,
  args: {
    type: 'overlay',
    heading: 'Text Heading',
    body: 'body text',
    dismissible: false,
    buttons: {
      layout: 'vertical',
      items: [
        { label: 'button' },
        { label: 'button' },
        { label: 'button' },
        { label: 'button' },
      ],
    },
  },
}
