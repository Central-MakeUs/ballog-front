import type { ComponentProps } from 'react'
import { createWebBridge } from '@ballog/bridge'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'

import { cn } from '@/shared/lib/classnames'
import { Profile } from '@/shared/ui/common/Profile/Profile'
import { useRecordingImages } from '@/features/record/hooks/useRecordImages'

interface IconProps extends ComponentProps<'div'> {
  state: 'default' | 'active'
  onClick?: () => void
}

export const Icon = ({ state, className, ...rest }: IconProps) => {
  const bridge = createWebBridge()
  const { hasImage } = useRecordingImages()

  // TODO: RN 에서 이미지 업로드 후 WEB 으로 돌아올 때 업로드 한 이미지 URL 을 가져와야 함.
  // useRecordingImages 에서 addImage 를 가져와 url 을 배열에 넣기
  const handleClick = () => {
    bridge.send(POST_MESSAGE_EVENT.OPEN_CAMERA, { message: 'camera' })
  }

  return (
    <div className={cn('cursor-pointer', className)} {...rest}>
      {/* <IconComponent onClick={handleClick} /> */}
      <Profile border={hasImage} onClick={handleClick} />
    </div>
  )
}
