import { Stack } from '@/app/routes/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'
import { SessionProvider } from '@/app/Provider/contexts/sessionContext'
import { Toaster } from '@/shared/ui/common/Sonner'
import { OverlayProvider } from '@/shared/hooks/useOverlay'

import { useUpdatePolicy } from './policy/update/useUpdatePolicy'

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
      <SessionProvider>
        <QueryProvider>
          <AppInner />
        </QueryProvider>
      </SessionProvider>
    </OverlayProvider>
  )
}

export default App
