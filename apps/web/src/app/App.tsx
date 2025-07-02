import { Stack } from '@/share/lib/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'

const App = () => {
  return (
    <QueryProvider>
      <Stack />
    </QueryProvider>
  )
}

export default App
