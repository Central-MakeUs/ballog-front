import { useEffect } from 'react'

import {
  shouldShowUpdateModal,
  countUpdateModalDismissed,
} from '../utils/updatePolicyUtils'

import { useCheckForUpdate } from './useCheckForUpdate'
import { useUpdateModal } from './useUpdateModal'

/**
 * @TODO : 버전 api 연동
 * 접속 시점 기준 48시간이 지나 있는지만 체크.
 * 사용중에 모달 뜬지 48시간이 지나버리는 경우엔 뜨지 않음. (별로 중요하지 않아보임)
 *  */
export const useUpdatePolicy = () => {
  const { openUpdateModal } = useUpdateModal()

  const { needUpdate } = useCheckForUpdate('1.0.2')

  const handleUpdatePolicy = (
    openUpdateModal: ReturnType<typeof useUpdateModal>['openUpdateModal'],
  ) => {
    if (!shouldShowUpdateModal()) return

    const timer = setTimeout(() => {
      openUpdateModal({
        type: 'optional',
        onDismiss: countUpdateModalDismissed,
      })
    }, 3000)

    return () => clearTimeout(timer)
  }

  useEffect(() => {
    if (!needUpdate) return
    handleUpdatePolicy(openUpdateModal)
  }, [needUpdate])
}
