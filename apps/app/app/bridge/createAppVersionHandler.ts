import * as Application from 'expo-application'
import type { AppBridge } from '@ballog/bridge'
import { POST_MESSAGE_EVENT } from '@ballog/bridge'
import { Linking, Platform } from 'react-native'
import { APP_STORE_URL } from '@/shared/constants/appStoreUrl'

export const createAppVersionHandler = (bridge: AppBridge) => ({
  GET_MY_APP_VERSION: async () => {
    const version = Application.nativeApplicationVersion || 'unknown'

    bridge.send(POST_MESSAGE_EVENT.GET_MY_APP_VERSION, { version })
  },

  STORE_DEEP_LINK: async () => {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL(APP_STORE_URL.IOS)
      } else if (Platform.OS === 'android') {
        await Linking.openURL(APP_STORE_URL.ANDROID)
      }
    } catch {
      await Linking.openURL(APP_STORE_URL.FALLBACK)
    }
  },
})
