import { Stack } from '@/app/routes/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/provider/QueryProvider'
import { Toaster } from '@/shared/ui/common/Sonner'
import { OverlayProvider } from '@/shared/hooks/useOverlay'

import { SessionProvider } from './provider/SessionProvider'

const App = () => {
  return (
    <SessionProvider>
      <OverlayProvider>
        <QueryProvider>
          <Stack />

          {/* <NoticeModal /> */}
          <Toaster position="bottom-center" />
        </QueryProvider>
      </OverlayProvider>
    </SessionProvider>
  )
}

export default App
