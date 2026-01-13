import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/classnames'
import RightArrow from '@/assets/RightArrow'
import { Switch } from '@/shared/ui/common/switch'

interface ListProps {
  type: 'arrow' | 'switch'
  disabled?: boolean
  onClick?: () => void
  value?: boolean // switch일 때 필요
  onToggle?: (val: boolean) => void
  children: ReactNode
}

export const List = ({
  type,
  disabled,
  onClick,
  value,
  onToggle,
  children,
}: ListProps) => {
  return (
    <div
      className="flex items-center justify-between w-full p-4 min-w-82 bg-usage-background-subtle rounded-xlarge"
      onClick={onClick}
    >
      <span className="text-usage-text-default body-sm-medium">{children}</span>

      {type === 'arrow' ? (
        <button>
          <RightArrow
            className={cn('size-6 shrink-0 dark:text-brand-neutral-white light:text-brand-neutral-60')}
          />
        </button>
      ) : (
        <Switch
          disabled={disabled}
          checked={value}
          onCheckedChange={onToggle}
        />
      )}
    </div>
  )
}
