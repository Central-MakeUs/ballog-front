import messaging from '@react-native-firebase/messaging'
import { Alert } from 'react-native'

/**
 * IOS 에서 사용자에게 푸시 알림 권한 요청 함수
 */
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission({
    sound: true,
    badge: true,
    alert: true,
  })

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
    // 🔥 중요: 디바이스를 원격 메시지에 등록
    await messaging().registerDeviceForRemoteMessages()
  }

  return enabled
}

/**
 * 현재 디바이스 FCM 토큰을 반환하는 함수
 * @return token
 */
export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken()
    console.log('FCM Token:', token)
    return token
  } catch (error) {
    console.error('FCM 토큰 가져오기 실패:', error)
    return null
  }
}

/**
 * 포그라운드 메시지 수신 핸들러 등록 함수
 * 앱이 켜져있는 상태에서 알림 수신 시 호출됨
 */
export const listenForegroundMessages = () => {
  return messaging().onMessage(async (remoteMessage) => {
    console.log('포그라운드 알림 수신:', remoteMessage)
    Alert.alert(
      remoteMessage.notification?.title || '알림',
      remoteMessage.notification?.body || '',
      [
        { text: '닫기', style: 'cancel' },
        { text: '확인', style: 'default' }
      ]
    );
    
    // 예: Alert.alert(remoteMessage.notification?.title ?? '알림')
  })
}

/**
 * 백그라운드 상태에서 메시지 수신 핸들러
 */
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('백그라운드 알림 수신:', remoteMessage)
//   // 알림 클릭 여부와 관계없이 수신시 실행됨
// })
