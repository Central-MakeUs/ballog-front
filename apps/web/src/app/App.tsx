import { useEffect } from 'react'

import { Stack } from '@/app/routes/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/provider/QueryProvider'
import { Toaster } from '@/shared/ui/common/Sonner'
import { OverlayProvider } from '@/shared/hooks/useOverlay'
import { getTheme, setTheme } from '@/shared/lib/theme'

import { SessionProvider } from './provider/SessionProvider'
import { useUpdatePolicy } from './policy/update/useUpdatePolicy'

export const ThemeInitializer = () => {
  useEffect(() => {
    setTheme(getTheme())
  }, [])

  return null
}

const AppInner = () => {
  useUpdatePolicy()

  return (
    <>
      <Stack />
      <Toaster position="bottom-center" />
    </>
  )
}

const App = () => {
  return (
    <OverlayProvider>
      <ThemeInitializer />
      <SessionProvider>
        <QueryProvider>
          <AppInner />
        </QueryProvider>
      </SessionProvider>
    </OverlayProvider>
  )
}

export default App
