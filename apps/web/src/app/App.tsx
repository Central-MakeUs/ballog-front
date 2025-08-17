import { Stack } from '@/shared/lib/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'
import { SessionProvider } from '@/shared/contexts/sessionContext'
import { Toaster } from '@/shared/ui/common/Sonner'
import { OverlayProvider } from '@/shared/hooks/useOverlay'

const App = () => {
  // localStorage.setItem(
  //   'accessToken',
  //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZXhwIjoxNzU1NDk1OTY3fQ.gay7J-x-EV3Zt3QcrkoL23Na0rCT5zRRiKKhsr83-6w',
  // )

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
