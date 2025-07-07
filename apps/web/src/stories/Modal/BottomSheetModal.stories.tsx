import type { Meta, StoryObj } from '@storybook/react-vite'
import { BottomSheetModal } from '@/shared/ui/common/Modal/bottomsheetModal'
import grayExampleImage from '@/assets/grayExampleImage.jpg'
import { useState } from 'react'

const meta: Meta<typeof BottomSheetModal> = {
  title: 'Common/BottomSheetModal',
  component: BottomSheetModal,
  argTypes: {
    heading: { control: 'text' },
    body: { control: 'text' },
    imgSrc: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof BottomSheetModal>

export const Default: Story = {
  args: {
    heading: 'text heading',
    body: 'body text',
    imgSrc: grayExampleImage,
    dismissible: true,
    buttons: [
      { label: '취소', onClick: () => console.log('취소 클릭됨') },
      { label: '확인', onClick: () => console.log('확인 클릭됨') },
    ],
    open: true,
    onOpenChange: (open) => console.log(`모달 상태 변경: ${open}`),
  },

  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.open)

    const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
      args.onOpenChange?.(open)
    }

    return (
      <BottomSheetModal
        {...args}
        open={isOpen}
        onOpenChange={handleOpenChange}
      />
    )
  },
}
