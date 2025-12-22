import { useEffect } from 'react'
import semver from 'semver'

import {
  shouldShowUpdateModal,
  countUpdateModalDismissed,
} from '../utils/updatePolicyUtils'

import { useGetAppVersion } from './useGetAppVersion'
import { useUpdateModal } from './useUpdateModal'

const DISMISS_KEY = 'UPDATE_MODAL_DISMISSED'
const UPDATE_MODAL_DELAY = 3000
const VITE_FORCE_UPDATE_VERSION = import.meta.env.VITE_FORCE_UPDATE_VERSION

/**
 * @TODO : 버전 api 연동
 * 접속 시점 기준 48시간이 지나 있는지만 체크.
 * 사용중에 모달 뜬지 48시간이 지나버리는 경우엔 뜨지 않음. (별로 중요하지 않아보임)
 *  */
export const useUpdatePolicy = () => {
  const { openUpdateModal } = useUpdateModal()

  const { localVersion } = useGetAppVersion()

  const handleUpdatePolicy = () => {
    if (!shouldShowUpdateModal()) return

    const timer = setTimeout(() => {
      openUpdateModal({
        type: 'force',
        onDismiss: countUpdateModalDismissed,
        dissmissible: false,
      })
    }, UPDATE_MODAL_DELAY)

    return () => clearTimeout(timer)
  }

  useEffect(() => {
    if (!localVersion) return
    const needForceUpdate = semver.lt(localVersion, VITE_FORCE_UPDATE_VERSION)

    if (!needForceUpdate) {
      localStorage.removeItem(DISMISS_KEY)
      return
    }

    const cleanup = handleUpdatePolicy()
    return cleanup
  }, [localVersion])
}
