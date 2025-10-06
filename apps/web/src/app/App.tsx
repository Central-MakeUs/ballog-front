import { Stack } from '@/app/routes/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'
import { SessionProvider } from '@/app/Provider/contexts/sessionContext'
import { Toaster } from '@/shared/ui/common/Sonner'
import { OverlayProvider } from '@/shared/hooks/useOverlay'
import { DateProvider } from '@/features/calendar/context/DateContext'

// import { NoticeModal } from './Notice/NoticeModal'

const App = () => {
  return (
    <SessionProvider>
      <OverlayProvider>
        <QueryProvider>
          <DateProvider>
            <Stack />
          </DateProvider>
          {/* <NoticeModal /> */}
          <Toaster position="bottom-center" />
        </QueryProvider>
      </OverlayProvider>
    </SessionProvider>
  )
}

export default App
