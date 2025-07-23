import { Stack } from '@/shared/lib/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'
import { MeProvider } from '@/shared/contexts/sessionContext'

const App = () => {
  return (
    <MeProvider>
      <QueryProvider>
        <Stack />
      </QueryProvider>
    </MeProvider>
  )
}

export default App
