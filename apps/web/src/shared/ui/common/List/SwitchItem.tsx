import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/classnames'
import { Switch } from '@/shared/ui/common/switch'

interface SwitchItemProps extends ComponentProps<'button'> {
  className?: string
}

export const SwitchItem = ({ className, ...props }: SwitchItemProps) => (
  <Switch className={cn(className)} {...props} />
)
