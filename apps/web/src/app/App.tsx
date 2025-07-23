import { Stack } from '@/shared/lib/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'
import { SessionProvider } from '@/shared/contexts/sessionContext'
import { Toaster } from '@/shared/ui/common/Sonner'

const App = () => {
  return (
    <SessionProvider>
      <QueryProvider>
        <Stack />
        <Toaster position="bottom-center" />
      </QueryProvider>
    </SessionProvider>
  )
}

export default App
