import { POST_MESSAGE_EVENT } from '@ballog/bridge'
import type { InstagramPayload } from '@ballog/bridge'

import { useBridge } from '@/shared/hooks/bridge/useBridge'
import { List } from '@/shared/ui/common/List/List'

const BALLOG_INSTAGRAM = 'y_h2._'

export const BallogInstagramList = () => {
  const { send } = useBridge()

  const handleInstagramClick = () => {
    const payload: InstagramPayload = {
      username: BALLOG_INSTAGRAM,
    }

    send(POST_MESSAGE_EVENT.OPEN_INSTAGRAM, payload)
  }

  return (
    <List type="arrow" onClick={handleInstagramClick}>
      볼로그 인스타그램
    </List>
  )
}
