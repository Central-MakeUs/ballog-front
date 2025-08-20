import { useEffect } from 'react'
import { BottomSheet } from '@stackflow/plugin-basic-ui'
import {
  createWebBridge,
  POST_MESSAGE_EVENT,
  MESSAGE_STATUS,
} from '@ballog/bridge'
import { toast } from 'sonner'

import { BottomSheetModal } from '@/shared/ui/common/BottomSheetModal'
import { useFlow } from '@/shared/lib/stackflow'

export const ShareBottomSheet = ({
  params,
}: {
  params: { imageUrl: string }
}) => {
  const { pop } = useFlow()
  const bridge = createWebBridge()

  const handleImageDownload = () => {
    if (bridge.isRNEnvironment()) {
      bridge.send(POST_MESSAGE_EVENT.DOWNLOAD_IMAGE, {
        imageUrl: params.imageUrl,
      })
    }
  }

  const handleInstagramShare = () => {
    if (bridge.isRNEnvironment()) {
      bridge.send(POST_MESSAGE_EVENT.SHARE_TO_INSTAGRAM_STORY, {
        imageUrl: params.imageUrl,
      })
    } else {
      toast.info('모바일 앱에서만 공유할 수 있습니다.')
    }
  }

  useEffect(() => {
    bridge.addEventListener(
      POST_MESSAGE_EVENT.IMAGE_DOWNLOAD_RESPONSE,
      (payload: { message: string }) => {
        if (payload.message === MESSAGE_STATUS.DOWNLOAD_COMPLETED) {
          toast('이미지가 저장되었습니다.')
        } else if (payload.message === MESSAGE_STATUS.DOWNLOAD_FAILED) {
          toast.error('이미지 저장에 실패했습니다.')
        }
      },
    )

    bridge.addEventListener(
      POST_MESSAGE_EVENT.INSTAGRAM_SHARE_RESPONSE,
      (payload: { message: string }) => {
        if (payload.message === MESSAGE_STATUS.SHARE_COMPLETED) {
          toast('인스타그램 스토리로 공유되었습니다.')
        } else if (payload.message === MESSAGE_STATUS.SHARE_FAILED) {
          toast.error('공유에 실패했습니다.')
        }
      },
    )
  }, [])

  return (
    <BottomSheet data-testid="share-bottom-sheet">
      <BottomSheetModal.Root
        className="flex"
        open={true}
        onOpenChange={() => {
          pop()
        }}
        dismissible={true}
      >
        <BottomSheetModal.Text heading="사진 공유하기" />
        <BottomSheetModal.Image
          className="rounded-md"
          src={params.imageUrl}
          data-testid="share-image"
        />
        <BottomSheetModal.Buttons
          buttons={[
            { label: '이미지 저장', onClick: handleImageDownload },
            {
              label: '공유하기',
              onClick: handleInstagramShare,
            },
          ]}
        />
      </BottomSheetModal.Root>
    </BottomSheet>
  )
}

export default ShareBottomSheet
