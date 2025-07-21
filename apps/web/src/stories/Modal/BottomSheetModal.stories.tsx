import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { BottomSheetModal } from '@/shared/ui/common/BottomSheetModal'
import grayExampleImage from '@/assets/grayExampleImage.jpg'

const meta: Meta = {
  title: 'shared/BottomSheetModal',
  component: BottomSheetModal.Root,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => {
    const BottomSheetModalComponent = () => {
      const [open, setOpen] = useState(true)

      return (
        <BottomSheetModal.Root
          open={open}
          onOpenChange={setOpen}
          dismissible={false}
        >
          <BottomSheetModal.Text
            heading="사진 업로드 완료"
            body="업로드가 성공적으로 완료되었습니다."
          />
          <BottomSheetModal.Image src={grayExampleImage} />
          <BottomSheetModal.Buttons
            buttons={[
              { label: '취소', onClick: () => setOpen(false) },
              { label: '확인', onClick: () => alert('확인') },
            ]}
          />
        </BottomSheetModal.Root>
      )
    }

    return <BottomSheetModalComponent />
  },
}
