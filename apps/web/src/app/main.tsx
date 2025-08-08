import { createRoot } from 'react-dom/client'

import '../shared/ui/global.css'
import { startMocking } from '@/mocks/browser'

import App from './App'

function bootstrap() {
  // if (import.meta.env.DEV) {
  //   await startMocking()
  // }

  createRoot(document.getElementById('root')!).render(
    <>
      <App />
    </>,
  )
}

bootstrap()
