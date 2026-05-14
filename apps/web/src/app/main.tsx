import { createRoot } from 'react-dom/client'

import '../shared/ui/global.css'

import App from './App'

function bootstrap() {
  createRoot(document.getElementById('root')!).render(
    <>
      <App />
    </>,
  )
}

bootstrap()
