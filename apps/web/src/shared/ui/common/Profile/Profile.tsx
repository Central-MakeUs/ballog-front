import DefaultProfile from '@/assets/defaultProfile.png'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'
import { ProfileFrameWithBorder } from '@/shared/ui/common/Profile/ProfileFrameWithBorder'
import { ProfileFrameNoBorder } from '@/shared/ui/common/Profile/ProfileFrameNoBorder'

interface ProfileProps extends ComponentProps<'div'> {
  border: boolean
  imgSrc?: string
}

/**
 * Profile - 프로필 이미지 컴포넌트
 *
 * 프로필 이미지를 원형 프레임 안에 렌더링하는 공통 UI 컴포넌트
 *
 * - 프레임 및 마스킹 처리: SVG 내부에서 clipPath + mask 조합으로 처리
 * - + 버튼: 프레임 SVG에 포함되어 있으며 항상 우측 하단에 고정됨
 * - 기본 이미지: imgSrc가 전달되지 않으면 내부 기본 이미지(DefaultProfile)를 사용
 *
 * @props
 * @param {string} [imgSrc] - 프로필 이미지 URL
 * @param {boolean} border - true일 경우 외곽선 있는 프레임 사용
 * @param {string} [className] - 추가적으로 적용할 CSS 클래스
 *
 * @example
 * <Profile imgSrc="/img/user.png" border />
 * <Profile border={false} />
 */

export const Profile = ({
  border,
  imgSrc,
  className,
  ...rest
}: ProfileProps) => {
  if (!imgSrc) imgSrc = DefaultProfile
  return (
    <div className={cn('relative w-21 h-21', className)} {...rest}>
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
