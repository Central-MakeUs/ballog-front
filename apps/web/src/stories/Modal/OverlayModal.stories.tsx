import type { Meta, StoryObj } from '@storybook/react-vite'
import { OverlayModal } from '@/shared/ui/common/Modal/overlayModal'
import grayExampleImage from '@/assets/grayExampleImage.jpg'

const meta: Meta<typeof OverlayModal> = {
  title: 'Components/OverlayModal',
  component: OverlayModal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OverlayModal>

export const HorizontalButtons: Story = {
  args: {
    layout: 'horizontal',
    heading: 'text heading',
    body: 'body text',
    dismissible: true,
    open: true,
    onOpenChange: (open) => console.log('open changed:', open),
    buttons: [
      { label: '취소', onClick: () => alert('취소 클릭') },
      { label: '확인', onClick: () => alert('확인 클릭') },
    ],
  },
}

export const VerticalButtons: Story = {
  args: {
    layout: 'vertical',
    heading: 'text heading',
    body: 'body text',
    dismissible: true,
    open: true,
    onOpenChange: (open) => console.log('open changed:', open),
    buttons: [
      { label: '옵션1', onClick: () => alert('옵션1 클릭') },
      { label: '옵션2', onClick: () => alert('옵션2 클릭') },
      { label: '닫기', onClick: () => alert('닫기 클릭') },
    ],
  },
}

export const NoneWithImage: Story = {
  args: {
    layout: 'none',
    heading: 'text heading',
    body: 'body text',
    imgSrc: grayExampleImage,
    dismissible: true,
    open: true,
    onOpenChange: (open) => console.log('open changed:', open),
  },
}
