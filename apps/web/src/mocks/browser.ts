import { setupWorker } from 'msw/browser'

import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export const startMocking = async () => {
  if (import.meta.env.MODE !== 'development') {
    await worker.start()
  }
}
