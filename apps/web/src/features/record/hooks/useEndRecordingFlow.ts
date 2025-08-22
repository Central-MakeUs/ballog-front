import React from 'react'

import { useFlow, activities } from '@/shared/lib/stackflow'
import { useModal } from '@/shared/hooks/modal/useModal'
import { SuccessLottie } from '@/features/record/ui/SuccessLottie'

export interface EndRecordingFlowOptions {
  destination?: keyof typeof activities
  confirmHeading?: string
  successHeading?: string
  delayMs?: number
}

export const useEndRecordingFlow = (opts?: EndRecordingFlowOptions) => {
  const {
    destination = 'Record',
    confirmHeading = '기록을 완료하시겠습니까?',
    successHeading = '기록이 완료되었어요!',
    delayMs = 3000,
  } = opts ?? {}

  const { replace } = useFlow()
  const { openHorizontalModal, openImageModal } = useModal()

  // 마지막 모달
  const leavePage = () => {
    setTimeout(() => {
      replace(destination, {})
    }, delayMs)

    openImageModal({
      heading: successHeading,
      renderContent: () =>
        React.createElement(SuccessLottie, {
          onComplete: () => replace(destination, {}),
        }),
    })
  }

  // 첫 번째 모달
  const confirmEndRecord = () => {
    openHorizontalModal({
      heading: confirmHeading,
      buttons: [
        { label: '취소', onClick: close },
        { label: '종료하기', onClick: leavePage },
      ],
    })
  }

  return { confirmEndRecord, leavePage }
}
