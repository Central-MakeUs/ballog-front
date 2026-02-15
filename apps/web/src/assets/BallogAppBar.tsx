import { ColoredBallogLogo, WhiteBallogLogo } from '@ballog/asset/icons'
import type { SVGProps } from 'react'
import { useSyncExternalStore } from 'react'

import { cn } from '@/shared/lib/classnames'
import { themeStore } from '@/shared/lib/theme'

const BallogAppBar = (props: SVGProps<SVGSVGElement>) => {
  const { className, ...rest } = props
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
  )
  const Logo = theme === 'dark' ? WhiteBallogLogo : ColoredBallogLogo

  return <Logo className={cn('h-16 w-auto', className)} {...rest} />
}

export default BallogAppBar
