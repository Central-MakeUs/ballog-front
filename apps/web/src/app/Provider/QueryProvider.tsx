import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type React from 'react'

const queryClient = new QueryClient()

interface QueryProviderProps {
  children: React.ReactNode
}

export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
