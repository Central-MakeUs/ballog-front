import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/classnames'
import RightArrow from '@/assets/rightArrow.svg?react'
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
      className="flex items-center justify-between w-full min-w-82 p-4 bg-usage-background-subtle rounded-xlarge"
      onClick={onClick}
    >
      <span className="text-brand-neutral-white body-sm-medium">
        {children}
      </span>

      {type === 'arrow' ? (
        <button>
          <RightArrow className={cn('size-6 shrink-0')} />
        </button>
      ) : (
        <Switch disabled={disabled} checked={value} onCheckedChange={onToggle} />
      )}
    </div>
  )
}
