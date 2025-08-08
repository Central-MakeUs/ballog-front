import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { initializeKakaoSDK } from '@react-native-kakao/core'

import { ImageBridgeProvider } from '@/shared/contexts/imageBridgeContext'
import {
  requestPlatformPermission,
  getFcmToken,
  listenForegroundMessages,
} from '@/shared/lib/firebase/messaging'

export default function RootLayout() {
  // 전역에서 푸시 알림 수신 위해 _layout 에 작업
  useEffect(() => {
    initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY}`)
    const setupFCM = async () => {
      try {
        // 플랫폼별 권한 요청
        const permissionGranted = await requestPlatformPermission()
        console.log('권한 허용됨:', permissionGranted)

        if (permissionGranted) {
          await getFcmToken()
          const unsubscribe = listenForegroundMessages()

          return () => {
            unsubscribe()
          }
        } else {
          console.log('알림 권한이 거부되어 FCM 설정을 건너뜁니다')
        }
      } catch (error) {
        console.error('FCM setup error:', error)
      }
    }

    const unsub = setupFCM()
    return () => {
      unsub.then((f) => f?.())
    }
  }, [])

  return (
    <>
      <ImageBridgeProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </ImageBridgeProvider>
    </>
  )
}
