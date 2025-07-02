import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../share/ui/global.css'
import AppRouter from '@/app/AppRouter'
import { startMocking } from '@/mocks/browser'

startMocking()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
