import { KakaoTalk } from '@/assets/KakaoTalk'
import { useFlow } from '@/shared/lib/stackflow'
import { cn } from '@/shared/lib/classnames'
import { Chevron } from '@/assets/Chevron'
import { Button } from '@/shared/ui/common/Button/Button'
import type { ComponentProps } from 'react'
import { Apple } from '@/assets/Apple'

interface SocialButtonProps extends ComponentProps<'button'> {
  className?: string
}

export const KakaoButton = ({ className, ...props }: SocialButtonProps) => {
  const { push } = useFlow()

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
        push('TeamSelect', {
          selectedTeam: null,
        })
      }}
      {...props}
    >
      카카오로 시작하기
    </Button>
  )
}

export const AppleButton = ({ className, ...props }: SocialButtonProps) => {
  return (
    <Button
      leftIcon={<Apple className="size-6" />}
      rightIcon={<Chevron className="size-6" />}
      size="lg"
      className={cn(
        'bg-brand-neutral-5 justify-between body-sm-medium text-usage-text-inverse',
        'active:bg-brand-neutral-5/80 py-4',
        className,
      )}
      {...props}
    >
      애플 로그인
    </Button>
  )
}
