import { Stack } from '@/shared/lib/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'
import { SessionProvider } from '@/shared/contexts/sessionContext'
import { Toaster } from '@/shared/ui/common/Sonner'
import { AlarmProvider } from '@/features/auth/contexts/alarmContext'
import { OverlayProvider } from '@/hooks/useOverlay'

const App = () => {
  return (
    <SessionProvider>
      <AlarmProvider>
        <OverlayProvider>
          <QueryProvider>
            <Stack />
            <Toaster position="bottom-center" />
          </QueryProvider>
        </OverlayProvider>
      </AlarmProvider>
    </SessionProvider>
  )
}

export default App
