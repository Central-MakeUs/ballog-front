import { createWebBridge } from '@ballog/bridge'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'

const ImageUploader = () => {
  const bridge = createWebBridge()
  const handleClick = () => {
    console.log("click")
    bridge.send(POST_MESSAGE_EVENT.OPEN_CAMERA, { message: 'camera' })
  }

  return (
    <div className="relative flex flex-col items-center" onClick={handleClick}>
      <div className="absolute -top-5 -left-4 bg-gray-600 text-white text-xs rounded px-2 py-1">
        이미지 등록하기
        <div
          className="absolute top-5 left-1/2 -bottom-2 translate-x-[-50%]"
          style={{
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '20px solid #4b5563', // gray-600
          }}
        ></div>
      </div>

      <div className="bg-gray-300 rounded-full w-24 h-24 flex items-center justify-center">
        <span className="text-sm text-black">{`{이미지}`}</span>
      </div>

      <div className="absolute bottom-0 right-0 bg-gray-600 rounded-full w-7 h-7 flex items-center justify-center text-white text-md">
        +
      </div>
    </div>
  )
}

export default ImageUploader
