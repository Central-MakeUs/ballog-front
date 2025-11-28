import { useContext } from 'react'

import { SessionContext } from '../contexts/sessionContext'

export const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (!context)
    throw new Error('useSessionContext must be used within SessionProvider')
  return context
}
