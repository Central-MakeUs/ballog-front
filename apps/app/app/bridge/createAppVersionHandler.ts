import * as Application from 'expo-application'
import type { AppBridge } from '@ballog/bridge'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'

export const createAppVersionHandler = (bridge: AppBridge) => ({
  GET_MY_APP_VERSION: async () => {
    const version = Application.nativeApplicationVersion || 'unknown'

    bridge.send(POST_MESSAGE_EVENT.GET_MY_APP_VERSION, { version })
  },
})
