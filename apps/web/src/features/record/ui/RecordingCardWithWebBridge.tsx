import { createWebBridge, POST_MESSAGE_EVENT } from '@ballog/bridge'

import { RecordingCard } from '@/entities/record/ui/RecordingCard'
import { useRecordingImages } from '@/features/record/hooks/useRecordImages'
import { useWebViewBridgeListener } from '@/features/record/hooks/useWebViewBridgeListener'

export const RecordingCardWithWebBridge = () => {
  const bridge = createWebBridge()
  const { hasImage } = useRecordingImages()

  const handleClick = () => {
    bridge.send(POST_MESSAGE_EVENT.OPEN_CAMERA, { message: 'camera' })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useWebViewBridgeListener((_base64) => {
    // TODO: 서버 업로드 후 URL로 addImage(base64) 할 예정
    // addImage(base64)
  })

  return (
    <RecordingCard.Root className="w-full">
      <RecordingCard.Icon
        state={hasImage ? 'active' : 'default'}
        onClick={handleClick}
      />
      <RecordingCard.Info
        homeTeam="LG 트윈스"
        awayTeam="SSG 랜더스"
        stadium="잠실야구장"
        date="2025.07.09"
      />
    </RecordingCard.Root>
  )
}
