import { BallogLogo } from '@/assets/BallogLogo'
import type { ComponentProps } from 'react'

interface GNBButtonProps extends ComponentProps<'button'> {
  active?: boolean
  disabled?: boolean
  icon?: React.ComponentType<{ className?: string }>
  children?: React.ReactNode // 텍스트용
}

export const GNBButton = ({
  active = false,
  disabled = false,
  icon: IconComponent,
  children,
  ...props
}: GNBButtonProps) => {
  const logoColor = active
    ? 'text-brand-neutral-white'
    : 'text-brand-secondary-default'
  const textColor = active
    ? 'text-brand-neutral-white'
    : 'text-brand-secondary-default'

  return (
    <button
      className={`h-12 w-full gap-1 transition-colors
        flex flex-col items-center justify-between
      `}
      disabled={disabled}
      {...props}
    >
      {IconComponent && <IconComponent className={logoColor} />}
      {children && (
        <span className={`caption-md-medium ${textColor}`}>{children}</span>
      )}
    </button>
  )
}
