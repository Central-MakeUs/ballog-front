import { Stack } from '@/app/routes/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/provider/QueryProvider'
import { Toaster } from '@/shared/ui/common/Sonner'
import { OverlayProvider } from '@/shared/hooks/useOverlay'

import { SessionProvider } from './provider/SessionProvider'
import { useUpdatePolicy } from './policy/update/useUpdatePolicy'

const AppInner = () => {
  useUpdatePolicy()

  return (
    <>
      <Stack />
      {/* <NoticeModal /> */}
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
