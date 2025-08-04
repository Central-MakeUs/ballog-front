import { type ComponentProps } from 'react'
import { toast } from 'sonner'

import { KakaoTalk } from '@/assets/KakaoTalk'
import { useFlow } from '@/shared/lib/stackflow'
import { cn } from '@/shared/lib/classnames'
import { Chevron } from '@/assets/Chevron'
import { Button } from '@/shared/ui/common/Button/Button'
import { Apple } from '@/assets/Apple'

import { useSocialLogin } from '../hooks/useSocialLogin'

interface SocialButtonProps extends ComponentProps<'button'> {
  className?: string
}

export const KakaoButton = ({ className, ...props }: SocialButtonProps) => {
  const { push } = useFlow()
  // 카카오 로그인 훅
  const { handleLogin, isPending } = useSocialLogin({
    social: 'kakao',
    onSuccess: () => {
      push('TeamSelect', {
        selectedTeam: null,
      })
    },
    onError: (error) => {
      if (error && typeof error === 'object' && 'errorData' in error) {
        toast.error(error.errorData?.error)
        return
      }

      if (error instanceof Error) {
        toast.error(error.message)
        return
      }
    },
  })

  return (
    <Button
      leftIcon={<KakaoTalk className="size-6" />}
      rightIcon={<Chevron className="size-6" />}
      size="lg"
      disabled={isPending}
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
      {isPending ? '로그인 중...' : '카카오로 시작하기'}
    </Button>
  )
}

export const AppleButton = ({ className, ...props }: SocialButtonProps) => {
  const { push } = useFlow()
  const ua = navigator.userAgent
  // 애플 로그인 훅
  const { handleLogin, isPending } = useSocialLogin({
    social: 'apple',
    onSuccess: () => {
      push('TeamSelect', {
        selectedTeam: null,
      })
    },
    onError: (error) => {
      if (error && typeof error === 'object' && 'errorData' in error) {
        toast.error(error.errorData?.error)
        return
      }

      if (error instanceof Error) {
        toast.error(error.message)
        return
      }
    },
  })

  // IOS일 경우에만 애플 로그인 버튼 렌더링
  if (!/iPhone|iPad|iPod/.test(ua)) {
    return null
  }

  return (
    <Button
      leftIcon={<Apple className="size-6" />}
      rightIcon={<Chevron className="size-6" />}
      size="lg"
      disabled={isPending}
      className={cn(
        'bg-brand-neutral-5 justify-between body-sm-medium text-usage-text-inverse',
        'active:bg-brand-neutral-5/80 py-4',
        className,
      )}
      onClick={() => {
        handleLogin()
      }}
      {...props}
    >
      {isPending ? '로그인 중...' : '애플로 시작하기'}
    </Button>
  )
}
