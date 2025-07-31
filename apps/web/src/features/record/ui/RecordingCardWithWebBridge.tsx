import { createWebBridge, POST_MESSAGE_EVENT } from '@ballog/bridge'

import { RecordingCard } from '@/entities/record/ui/RecordingCard'
import { useRecordingImages } from '@/features/record/hooks/useRecordImages'
import { useWebViewBridgeListener } from '@/features/record/hooks/useWebViewBridgeListener'
import type { RecordingResponse } from '@/entities/record/model/recording.type'
import { TEAMS } from '@/shared/constants/teams'
import { STADIUM } from '@/shared/constants/stadium'

export const RecordingCardWithWebBridge = ({
  recordingData,
}: {
  recordingData: RecordingResponse
}) => {
  const bridge = createWebBridge()
  const { hasImage, addImage } = useRecordingImages()

  const handleClick = () => {
    bridge.send(POST_MESSAGE_EVENT.OPEN_CAMERA, { message: 'camera' })
  }

  useWebViewBridgeListener((image) => {
    addImage(image)
  })

  // 디버깅용 echo (images 배열 출력)
  //   useEffect(() => {
  //   if (!images.length) return

  //   const simplifiedImages = images.map((img) => ({
  //     ...img,
  //     base64: img.base64.slice(0, 50) + '...',
  //   }))

  //   window.ReactNativeWebView?.postMessage(
  //     JSON.stringify({
  //       eventName: 'SEND_IMAGE_ECHO',
  //       payload: simplifiedImages,
  //     }),
  //   )
  // }, [images])

  return (
    <RecordingCard.Root className="w-full">
      <RecordingCard.Icon
        state={hasImage ? true : false}
        onClick={handleClick}
      />
      <RecordingCard.Info
        homeTeam={TEAMS[recordingData.homeTeam]}
        awayTeam={TEAMS[recordingData.awayTeam]}
        stadium={STADIUM[recordingData.stadium]}
        date={recordingData.matchDate}
      />
    </RecordingCard.Root>
  )
}
