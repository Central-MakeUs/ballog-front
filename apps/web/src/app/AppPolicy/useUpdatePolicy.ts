import { useEffect } from 'react'

import { useCheckForUpdate } from './useCheckForUpdate'
import { useUpdateModal } from './useUpdateModal'

// TODO : 버전 api 연동
export const useUpdatePolicy = () => {
  const { openUpdateModal } = useUpdateModal()

  const { needUpdate } = useCheckForUpdate('1.0.0')

  useEffect(() => {
    if (!needUpdate) return
    const timer = setTimeout(() => {
      openUpdateModal({ type: 'optional' })
    }, 3000)
    return () => clearTimeout(timer)
  }, [needUpdate, openUpdateModal])
}
