import { type ComponentType, useEffect } from 'react'

import { useFlow } from '@/app/routes/stackflow'

export const withAuth = <P extends object>(Component: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const { replace } = useFlow()
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    useEffect(() => {
      if (!accessToken) replace('Login', {}, { animate: false })
    }, [accessToken, replace])
    if (!accessToken) return null
    return <Component {...props} />
  }

  return AuthenticatedComponent
}

export default withAuth
