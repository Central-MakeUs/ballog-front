/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/export */
import QueryProvider from '@/app/Provider/QueryProvider'
import { render, renderHook, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

export const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper, ...options })
const customRenderHook: typeof renderHook = (render, options) =>
  renderHook(render, { wrapper, ...options })

export * from '@testing-library/react'
export { customRender as render, customRenderHook as renderHook }
