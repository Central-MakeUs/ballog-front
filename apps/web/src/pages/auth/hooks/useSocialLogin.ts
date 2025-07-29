import { POST_MESSAGE_EVENT } from '@ballog/bridge'

import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { useBridgeEvent } from '@/shared/hooks/bridge/useBridgeEvent'

export const useSocialLogin = ({
  social,
  onSuccess,
  onError,
}: {
  social: 'kakao' | 'apple'
  onSuccess: () => void
  onError: () => void
}) => {
  const { send, isRNEnvironment } = useBridge()

  const handleLogin = () => {
    if (isRNEnvironment) {
      send(POST_MESSAGE_EVENT.LOGIN, { social })
    } else {
      onSuccess()
    }
  }

  useBridgeEvent(
    POST_MESSAGE_EVENT.LOGIN_RESPONSE,
    (payload) => {
      if (payload.status === 'success') {
        onSuccess()
      } else {
        onError()
      }
    },
    [onSuccess, onError],
  )

  return { handleLogin }
}
