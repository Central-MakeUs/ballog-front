import { ColoredBallogLogo, WhiteBallogLogo } from '@ballog/asset/icons'
import type { SVGProps } from 'react'
import { useSyncExternalStore } from 'react'

import { cn } from '@/shared/lib/classnames'
import { themeStore } from '@/shared/lib/theme'

interface BallogAppBarProps extends SVGProps<SVGSVGElement> {
  variant?: 'default' | 'login'
}

const BallogAppBar = (props: BallogAppBarProps) => {
  const { className, variant = 'default', ...rest } = props
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
  )

  if (variant === 'login') {
    return (
      <ColoredBallogLogo
        className={cn(
          'h-6 w-auto',
          "[&_path[fill='#212121']]:fill-brand-primary-default",
          className,
        )}
        {...rest}
      />
    )
  }

  const Logo = theme === 'dark' ? WhiteBallogLogo : ColoredBallogLogo

  return <Logo className={cn('h-16 w-auto', className)} {...rest} />
}

export default BallogAppBar
