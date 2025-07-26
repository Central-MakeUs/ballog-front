/* eslint-disable react-refresh/only-export-components */
import type { JSX, ReactElement, ReactNode } from 'react'
import { render, renderHook, type RenderOptions } from '@testing-library/react'
import { vi } from 'vitest'

import QueryProvider from '@/app/Provider/QueryProvider'
import { TestSessionProvider } from '@/test/TestSessionProvider'

const mockSetUser = vi.fn()

export const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <TestSessionProvider value={{ user: null, setUser: mockSetUser }}>
      <QueryProvider>{children as JSX.Element[]}</QueryProvider>
    </TestSessionProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper, ...options })
const customRenderHook: typeof renderHook = (render, options) =>
  renderHook(render, { wrapper, ...options })

export * from '@testing-library/react'
export { customRender as render, customRenderHook as renderHook }
