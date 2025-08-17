import { Button } from '@/shared/ui/common'
import { useFlow } from '@/shared/lib/stackflow'
import { useModal } from '@/shared/hooks/modal/useModal'

import { SuccessLottie } from './SuccessLottie'

export const EndRecordingButton = () => {
  const { replace } = useFlow()
  const { openHorizontalModal, openImageModal } = useModal()

  // 마지막 모달
  const leavePage = () => {
    setTimeout(() => {
      replace('Record', {})
    }, 3000)

    openImageModal({
      heading: '기록이 완료되었어요!',
      renderContent: () => (
        <SuccessLottie onComplete={() => replace('Record', {})} />
      ),
    })
  }

  // 첫 번째 모달
  const confirmEndRecord = () => {
    openHorizontalModal({
      heading: '기록을 완료하시겠습니까?',
      buttons: [
        { label: '취소', onClick: close },
        {
          label: '종료하기',
          onClick: () => {
            leavePage()
          },
        },
      ],
    })
  }

  return (
    <div className="fixed bottom-10 w-full">
      <div className="px-4 max-w-screen-md mx-auto">
        <Button
          variant="secondary"
          state="pressed"
          size="lg"
          onClick={confirmEndRecord}
          className="w-full bg-brand-secondary-default"
        >
          기록 완료하기
        </Button>
      </div>
    </div>
  )
}
