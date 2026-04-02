import React from 'react'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/classnames'

interface GNBButtonProps extends ComponentProps<'button'> {
  active?: boolean
  disabled?: boolean
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  children?: React.ReactNode // 텍스트용
}

/**
 * GNBButton
 * GNB 버튼 컴포넌트
 *
 * 컴포넌트 구성:
 * - 아이콘 표시
 * - 텍스트 표시
 * - 클릭 시 효과 추가
 *
 * 사용 예시:
 * <GNBButton icon={BallogLogo} />
 * @param active 활성 상태
 * @param disabled 비활성 상태
 * @param icon 아이콘 컴포넌트
 * @param children 텍스트
 * @returns
 */
export const GNBButton = ({
  active = false,
  disabled = false,
  icon: IconComponent,
  children,
  ...props
}: GNBButtonProps) => {
  const iconColor = active
    ? 'text-brand-neutral-white light:text-brand-neutral-80'
    : 'text-brand-secondary-default light:text-brand-neutral-30'

  return (
    <button
      className={`h-12 w-full gap-1 transition-colors
        flex flex-col items-center justify-between
      `}
      disabled={disabled}
      {...props}
    >
      {IconComponent && <IconComponent className={cn('w-6 h-6', iconColor)} />}
      {children && (
        <span
          className={cn(
            'caption-md-medium light:text-bg-green-default',
            iconColor,
          )}
        >
          {children}
        </span>
      )}
    </button>
  )
}
