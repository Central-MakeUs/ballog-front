import { Stack } from '@/shared/lib/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'
import { SessionProvider } from '@/shared/contexts/sessionContext'
import { Toaster } from '@/shared/ui/common/Sonner'
import { OverlayProvider } from '@/shared/hooks/useOverlay'

const App = () => {
  return (
    <SessionProvider>
      <OverlayProvider>
        <QueryProvider>
          <Stack />
          <Toaster position="bottom-center" />
        </QueryProvider>
      </OverlayProvider>
    </SessionProvider>
  )
}

export default App
