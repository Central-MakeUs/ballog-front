import { createWebBridge, POST_MESSAGE_EVENT } from '@ballog/bridge'

import { RecordingCard } from '@/entities/record/ui/RecordingCard'
import { useRecordingImages } from '@/features/record/hooks/useRecordImages'
import { useWebViewBridgeListener } from '@/features/record/hooks/useWebViewBridgeListener'

export const RecordingCardWithWebBridge = () => {
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
        homeTeam="LG 트윈스"
        awayTeam="SSG 랜더스"
        stadium="잠실야구장"
        date="2025.07.09"
      />
    </RecordingCard.Root>
  )
}
