import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { OverlayModal } from '@/shared/ui/common/OverlayModal'
import grayExampleImage from '@/assets/grayExampleImage.jpg'

const meta: Meta<typeof OverlayModal.Root> = {
  title: 'shared/OverlayModal',
  component: OverlayModal.Root,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof OverlayModal.Root>

export const HorizontalButtons: Story = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <OverlayModal.Root open={open} onOpenChange={setOpen} dismissible={false}>
        <OverlayModal.Text
          heading="정말 삭제할까요?"
          body="삭제하면 복구할 수 없습니다."
        />
        <OverlayModal.Buttons
          layout="horizontal"
          buttons={[
            { label: '취소', onClick: () => alert('취소') },
            { label: '삭제', onClick: () => alert('삭제') },
          ]}
        />
      </OverlayModal.Root>
    )
  },
}

export const VerticalButtons: Story = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <OverlayModal.Root open={open} onOpenChange={setOpen} dismissible={false}>
        <OverlayModal.Text heading="앱 종료" body="정말 앱을 종료하시겠어요?" />
        <OverlayModal.Buttons
          layout="vertical"
          buttons={[
            { label: '종료 안함', onClick: () => alert('클릭') },
            { label: '종료 안함2', onClick: () => alert('클릭') },
            { label: '종료', onClick: () => alert('앱 종료') },
          ]}
        />
      </OverlayModal.Root>
    )
  },
}

export const WithImage: Story = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <OverlayModal.Root open={open} onOpenChange={setOpen} dismissible={false}>
        <OverlayModal.Image imgSrc={grayExampleImage} />
        <OverlayModal.Text
          heading="사진 업로드 완료"
          body="업로드가 성공적으로 완료되었습니다."
          isImageModal={true}
        />
      </OverlayModal.Root>
    )
  },
}
