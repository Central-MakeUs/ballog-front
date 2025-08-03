import { AppBridge, POST_MESSAGE_EVENT } from '@ballog/bridge'
import { login, logout } from '@react-native-kakao/user'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const createLoginHandler = (bridge: AppBridge) => {
  return {
    LOGIN: async () => {
      try {
        const res = await login()
        // AsyncStorage에 accessToken 저장
        if (res.accessToken) {
          await AsyncStorage.setItem('accessToken', res.accessToken)
        }

        // 단순히 성공 상태만 전송
        bridge.send(POST_MESSAGE_EVENT.LOGIN_RESPONSE, {
          status: 'success',
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        })
      } catch (error) {
        console.log(error)
        bridge.send(POST_MESSAGE_EVENT.LOGIN_RESPONSE, {
          status: 'error',
          accessToken: '',
          refreshToken: '',
        })
      }
    },
    LOGOUT: async () => {
      try {
        await logout()
      } catch (error) {
        console.log(error)
        bridge.send(POST_MESSAGE_EVENT.LOGOUT_RESPONSE, {
          status: 'error',
        })
        return
      }

      bridge.send(POST_MESSAGE_EVENT.LOGOUT_RESPONSE, {
        status: 'success',
      })
    },
  }
}
