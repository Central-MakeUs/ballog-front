import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

import { ImageBridgeProvider } from '@/shared/contexts/imageBridgeContext'
// import '@react-native-firebase/app'
import {
  requestUserPermission,
  getFcmToken,
  listenForegroundMessages,
} from '@/shared/lib/firebase/messaging'
// import messaging from '@react-native-firebase/messaging'
// import firebase from '@react-native-firebase/app'


export default function RootLayout() {

  // 전역에서 푸시 알림 수신 위해 _layout 에 작업
  useEffect(() => {
     const setupFCM = async () => {
      try {
        await requestUserPermission()
        await getFcmToken()
        const unsubscribe = listenForegroundMessages()
        return unsubscribe
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
