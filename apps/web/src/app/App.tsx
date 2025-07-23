import { Stack } from '@/shared/lib/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'
import { SessionProvider } from '@/shared/contexts/sessionContext'

const App = () => {
  return (
    <SessionProvider>
      <QueryProvider>
        <Stack />
      </QueryProvider>
    </SessionProvider>
  )
}

export default App
