import DefaultProfile from '@/assets/defaultProfile.png'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'
import { ProfileFrameWithBorder } from '@/shared/ui/common/Profile/ProfileFrameWithBorder'
import { ProfileFrameNoBorder } from '@/shared/ui/common/Profile/ProfileFrameNoBorder'

interface ProfileProps extends ComponentProps<'div'> {
  border: boolean
  imgSrc?: string
}

export const Profile = ({
  border,
  imgSrc,
  className,
  ...rest
}: ProfileProps) => {
  if (!imgSrc) imgSrc = DefaultProfile
  return (
    <div className={cn('relative w-[60px] h-[60px]', className)} {...rest}>
      {border ? (
        <>
          <ProfileFrameWithBorder imgSrc={imgSrc} />
        </>
      ) : (
        <ProfileFrameNoBorder imgSrc={imgSrc} />
      )}
    </div>
  )
}
