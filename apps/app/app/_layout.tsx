import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { initializeKakaoSDK } from '@react-native-kakao/core'

export default function RootLayout() {
  useEffect(() => {
    initializeKakaoSDK(`${process.env.EXPO_PUBLIC_KAKAO_NATIVE_KEY}`)
  }, [])

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </>
  )
}
