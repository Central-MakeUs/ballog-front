/* eslint-disable react-refresh/only-export-components */
import type { ReactElement, ReactNode } from 'react'
import { render, renderHook, type RenderOptions } from '@testing-library/react'

import QueryProvider from '@/app/Provider/QueryProvider'
import { OverlayProvider } from '@/shared/hooks/useOverlay'

export const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <OverlayProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </OverlayProvider>
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
