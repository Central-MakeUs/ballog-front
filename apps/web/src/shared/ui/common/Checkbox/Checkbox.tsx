import React from 'react'

import CheckStroke from '@/assets/CheckStroke.svg?react'
import { cn } from '@/shared/lib/classnames'

interface CheckboxProps {
  checked: boolean
  onToggle: () => void
  className?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'relative size-6 flex justify-center items-center rounded-sm',
        className,
        checked ? 'bg-brand-primary-default' : 'bg-usage-background-strong',
      )}
      onClick={onToggle}
    >
      <CheckStroke />
    </div>
  )
}

export default Checkbox
