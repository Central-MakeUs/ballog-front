import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from '@/ui/Modal/modal'

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
}

export default meta
type Story = StoryObj<typeof Modal>

export const OverlayHorizontal: Story = {
  args: {
    type: 'overlay',
    heading: 'Overlay Horizontal',
    body: '이건 overlay horizontal body 임',
    dismissible: true,
    buttons: {
      layout: 'horizontal',
      items: [
        { label: '취소', onClick: () => alert('취소 클릭') },
        { label: '확인', onClick: () => alert('확인 클릭') },
      ],
    },
  },
}

export const OverlayVertical: Story = {
  args: {
    type: 'overlay',
    heading: 'Overlay Vertical',
    body: '이건 overlay vertical body 임',
    dismissible: true,
    buttons: {
      layout: 'vertical',
      items: [
        { label: '첫 번째', onClick: () => alert('첫 번째 클릭') },
        { label: '두 번째', onClick: () => alert('두 번째 클릭') },
        { label: '세 번째', onClick: () => alert('세 번째 클릭') },
      ],
    },
  },
}

export const OverlayImage: Story = {
  args: {
    type: 'overlay',
    heading: 'Overlay Image',
    body: '이건 overlay 이미지 body 임',
    dismissible: true,
    buttons: {
      layout: 'img',
      src: 'https://via.placeholder.com/100',
    },
  },
}

export const BottomSheetHorizontal: Story = {
  args: {
    type: 'bottomSheet',
    heading: 'BottomSheet Horizontal',
    body: '이건 bottom sheet horizontal body 임',
    dismissible: true,
    buttons: {
      layout: 'horizontal',
      items: [
        { label: '닫기', onClick: () => alert('닫기 클릭') },
        { label: '저장', onClick: () => alert('저장 클릭') },
      ],
    },
  },
}

export const BottomSheetImage: Story = {
  args: {
    type: 'bottomSheet',
    heading: 'BottomSheet Image',
    body: '이건 bottom sheet 이미지 모달입니다.',
    dismissible: true,
    buttons: {
      layout: 'img',
      src: 'https://via.placeholder.com/100',
    },
  },
}
