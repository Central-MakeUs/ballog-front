import { POST_MESSAGE_EVENT } from '@ballog/bridge'


export const createEchoDebugHandler = () => ({
  SEND_IMAGE_ECHO: (payload?: any) => {
    console.log('[RN] 웹에서 echo_log 수신:', payload)
  },
})
