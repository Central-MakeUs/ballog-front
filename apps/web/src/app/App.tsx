import { Stack } from '@/shared/lib/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'
import { Toaster } from '@/shared/ui/common/Sonner'

const App = () => {
  return (
    <QueryProvider>
      <Stack />
      <Toaster position="bottom-center" />
    </QueryProvider>
  )
}

export default App
