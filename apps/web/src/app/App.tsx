import { useEffect } from 'react'

import { Stack } from '@/app/routes/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import { Toaster } from '@/shared/ui/common/Sonner'
import { OverlayProvider } from '@/shared/hooks/useOverlay'
import { setTheme } from '@/shared/lib/theme'

import { useUpdatePolicy } from './policy/update/useUpdatePolicy'
import { useMswNotice } from './policy/msw/useMswNotice'
import QueryProvider from './Provider/QueryProvider'

export const ThemeInitializer = () => {
  useEffect(() => {
    setTheme('light')
  }, [])

  return null
}

const AppInner = () => {
  useUpdatePolicy()
  useMswNotice()

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
      <QueryProvider>
        <AppInner />
      </QueryProvider>
    </OverlayProvider>
  )
}

export default App
