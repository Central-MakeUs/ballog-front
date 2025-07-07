import type { Meta, StoryObj } from '@storybook/react-vite'
import { BottomSheetModal } from '@/shared/ui/common/Modal/bottomsheetModal'

const meta: Meta<typeof BottomSheetModal> = {
  title: 'Components/Modal/BottomSheetModal',
  component: BottomSheetModal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof BottomSheetModal>

export const Default: Story = {
  args: {
    open: true,
    heading: '선택하세요',
    body: '아래 옵션 중 하나를 선택할 수 있습니다.',
    hasImg: 'https://via.placeholder.com/300x150', // 임시 이미지
    dismissible: true,
    buttons: {
      layout: 'vertical',
      items: [
        {
          label: '옵션 1',
          onClick: () => alert('옵션 1 선택'),
        },
        {
          label: '옵션 2',
          onClick: () => alert('옵션 2 선택'),
        },
      ],
    },
  },
}
