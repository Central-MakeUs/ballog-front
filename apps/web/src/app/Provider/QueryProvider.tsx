import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { JSX } from 'react'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function QueryProvider({ children }: { children: JSX.Element }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NODE_ENV === 'development'}
      />
    </QueryClientProvider>
  )
}
