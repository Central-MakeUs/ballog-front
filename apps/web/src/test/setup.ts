import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll, vi } from 'vitest'
import * as React from 'react'

import { server } from '@/mocks/server'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

vi.mock('lottie-react', () => {
  const LottieMock = React.forwardRef((_, __) =>
    React.createElement('div', { 'data-testid': 'lottie-mock' }),
  )
  return { __esModule: true, default: LottieMock }
})

// ---- (옵션) ResizeObserver 폴리필 ----
class RO {
  public observe() {}
  public unobserve() {}
  public disconnect() {}
}
;globalThis.ResizeObserver = globalThis.ResizeObserver || RO
