import RecordingCardWithNoImage from '@/assets/recordingCardIconWithNoImage.svg?react'
import RecordingCardWithImage from '@/assets/recordingCardIconWithImage.svg?react'

interface IconProps {
  state: 'default' | 'active'
  onClick?: () => void
}

export const Icon = ({ state, onClick }: IconProps) => {
  const IconComponent =
    state === 'default' ? RecordingCardWithNoImage : RecordingCardWithImage

  return (
    <div onClick={onClick} className="cursor-pointer">
      <IconComponent />
    </div>
  )
}