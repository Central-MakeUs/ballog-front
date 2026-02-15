import { type ComponentProps } from 'react'

import { KakaoTalk } from '@/assets/KakaoTalk'
import { cn } from '@/shared/lib/classnames'
import { Chevron } from '@/assets/Chevron'
import { Button } from '@/shared/ui/common/Button/Button'
import { Apple } from '@/assets/Apple'

import { useSocialLoginFlow } from '../hooks/useSocialLoginFlow'

interface SocialButtonProps extends ComponentProps<'button'> {
  className?: string
}

export const KakaoButton = ({ className, ...props }: SocialButtonProps) => {
  const { handleLogin } = useSocialLoginFlow('kakao')

  return (
    <Button
      leftIcon={<KakaoTalk className="size-6" />}
      rightIcon={<Chevron className="size-6" />}
      size="lg"
      className={cn(
        'bg-[#FFD337]',
        'justify-between body-sm-medium text-usage-text-inverse',
        'active:bg-[#FFD337]/80 py-4',
        className,
      )}
      onClick={() => {
        handleLogin()
      }}
      {...props}
    >
      {'카카오로 시작하기'}
    </Button>
  )
}

export const AppleButton = ({ className, ...props }: SocialButtonProps) => {
  const ua = navigator.userAgent
  const { handleLogin } = useSocialLoginFlow('apple')

  // IOS일 경우에만 애플 로그인 버튼 렌더링
  if (!/iPhone|iPad|iPod/.test(ua)) {
    return null
  }

  return (
    <Button
      leftIcon={<Apple className="size-6" />}
      rightIcon={<Chevron className="size-6" />}
      size="lg"
      className={cn(
        'bg-brand-neutral-5 justify-between body-sm-medium text-brand-neutral-90',
        'dark:bg-brand-neutral-90 dark:text-brand-neutral-5',
        'active:bg-brand-neutral-5/80 dark:active:bg-brand-neutral-90/80 py-4',
        className,
      )}
      onClick={() => {
        handleLogin()
      }}
      {...props}
    >
      {'애플로 시작하기'}
    </Button>
  )
}
