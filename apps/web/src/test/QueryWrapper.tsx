/* eslint-disable react-refresh/only-export-components */
import type { JSX, ReactElement, ReactNode } from 'react'
import { render, renderHook, type RenderOptions } from '@testing-library/react'

import QueryProvider from '@/app/Provider/QueryProvider'
import { MeProvider } from '@/shared/contexts/sessionContext'

export const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <MeProvider>
      <QueryProvider>{children as JSX.Element}</QueryProvider>
    </MeProvider>
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
