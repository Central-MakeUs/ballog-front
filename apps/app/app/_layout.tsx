import { ImageBridgeProvider } from '@/shared/contexts/imageBridgeContext'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function RootLayout() {
  return (
    <>
      <ImageBridgeProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </ImageBridgeProvider>
    </>
  )
}
