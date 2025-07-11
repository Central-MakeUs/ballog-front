import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../shared/ui/global.css'
import { startMocking } from '@/mocks/browser'
import App from './App'

startMocking()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
