import React, { createContext, useContext } from 'react'
import { vi } from 'vitest'

export const mockSetUser = vi.fn()

const SessionContext = createContext({
  user: null,
  setUser: mockSetUser,
})

export const useSessionContext = () => useContext(SessionContext)

export const TestSessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <SessionContext.Provider value={{ user: null, setUser: mockSetUser }}>
    {children}
  </SessionContext.Provider>
)
