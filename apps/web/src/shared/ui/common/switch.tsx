import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/shared/lib/classnames'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'w-12.5 h-7',
        'px-1',
        'flex items-center',
        'dark:bg-brand-neutral-80 light:bg-brand-neutral-40 light:data-[state=checked]:bg-brand-primary-default',
        'rounded-full transition-colors shrink-0',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'size-5',
          'dark:bg-brand-neutral-white dark:data-[state=checked]:bg-brand-primary-default',
          "light:bg-white",
          'transition-transform rounded-full pointer-events-none',
          'translate-x-0 data-[state=checked]:translate-x-5.5'
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
