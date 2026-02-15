import { Toaster as Sonner, type ToasterProps } from 'sonner'
import { useSyncExternalStore } from 'react'

import { themeStore } from '@/shared/lib/theme'

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
  )

  return (
    <Sonner
      data-testid="toast"
      theme={theme as ToasterProps['theme']}
      className="toaster group !bottom-30"
      duration={1500}
      toastOptions={{
        className:
          '!bg-usage-background-inverse !text-usage-text-inverse body-sm-medium',
      }}
      {...props}
    />
  )
}
export { Toaster }
