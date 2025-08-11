import {
  getMessaging,
  requestPermission,
  AuthorizationStatus,
  registerDeviceForRemoteMessages,
  getAPNSToken,
  getToken,
  deleteToken,
  onMessage,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging'
import { getApp } from '@react-native-firebase/app'
import { Alert, Platform, PermissionsAndroid } from 'react-native'

const app = getApp()
const messaging = getMessaging(app)

const waitForApnsToken = async (timeoutMs = 3000, stepMs = 100) => {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    const apns = await getAPNSToken(messaging)
    if (apns) return apns
    await new Promise((r) => setTimeout(r, stepMs))
  }
  return null
}
/**
 * IOS 에서 사용자에게 푸시 알림 권한 요청 함수
 */
export const requestUserPermission = async () => {
  const authStatus = await requestPermission(messaging, {
    sound: true,
    badge: true,
    alert: true,
  })
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)

    await registerDeviceForRemoteMessages(messaging)
  }

  return enabled
}

/**
 * 현재 디바이스 FCM 토큰을 반환하는 함수
 * @return token
 */
export const getFcmToken = async () => {
  try {
    if (Platform.OS === 'ios') {
      // ios 에서 기기를 APNs 에 등록
      await registerDeviceForRemoteMessages(messaging)

      // 100ms 마다 APNs 요청
      const apns = await waitForApnsToken(3000, 100)
      if (!apns) {
        console.warn('APNs 토큰 준비 안됨')
        return null
      }
    }

    const token = await getToken(messaging)
    console.log('FCM 토큰 가져오기 성공:', token)
    return token
  } catch (error) {
    console.error('FCM 토큰 가져오기 실패:', error)
    return null
  }
}

// 토큰 삭제 함수
export const disableFcmToken = async () => {
  try {
    await deleteToken(messaging)
    console.log('FCM 토큰 삭제됨')
  } catch (error) {
    console.error('FCM 토큰 삭제 실패:', error)
  }
}

/**
 * 포그라운드 메시지 수신 핸들러 등록 함수
 * 앱이 켜져있는 상태에서 알림 수신 시 호출됨
 */
export const listenForegroundMessages = () => {
  return onMessage(messaging, async (remoteMessage) => {
    console.log('알림 수신:', remoteMessage)
    Alert.alert(
      remoteMessage.notification?.title || '알림',
      remoteMessage.notification?.body || '',
      [
        { text: '닫기', style: 'cancel' },
        { text: '확인', style: 'default' },
      ],
    )
  })
}

export const listenBackgroundMessages = () => {
  return setBackgroundMessageHandler(messaging, async (remoteMessage) => {
    console.log('앱이 백그라운드에서 실행됨:', remoteMessage)
    return Promise.resolve()
  })
}

// POST_NOTIFICATIONS 권한 요청
export const requestAndroidNotificationPermission = async () => {
  if (Platform.OS !== 'android') {
    return true // iOS는 Firebase messaging으로 처리
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    )

    console.log('Android 알림 권한 결과:', granted)
    return granted === PermissionsAndroid.RESULTS.GRANTED
  } catch (error) {
    console.error('Android 알림 권한 요청 실패:', error)
    return false
  }
}

// 권한 요청 (통합 함수)

export const requestPlatformPermission = async () => {
  if (Platform.OS === 'android') {
    // Android: POST_NOTIFICATIONS 권한 먼저 요청
    const androidPermission = await requestAndroidNotificationPermission()
    if (!androidPermission) {
      console.log('Android 알림 권한이 거부되었습니다')
      return false
    }
  }

  // iOS & Android: Firebase messaging 권한 요청
  const firebasePermission = await requestUserPermission()
  return firebasePermission
}
