import { StyleSheet, BackHandler, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useEffect, useRef } from 'react'
import { WebView } from 'react-native-webview'
import { useImageBridge } from '../shared/contexts/imageBridgeContext'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { useBridge } from './bridge/bridgeHandler'
import { useImageSender } from './bridge/hooks/useImageSender'
import { router } from 'expo-router'

const HomeScreen = () => {
  const webViewRef = useRef<WebView>(null)
  const { bridge } = useBridge(webViewRef)
  const insets = useSafeAreaInsets()

  const { imageData, clearImageData } = useImageBridge()
  useImageSender(bridge, imageData, clearImageData)

  // 뒤로가기 버튼 처리
  useEffect(() => {
    const backAction = () => {
      if (router.canGoBack()) {
        router.back()
        return true
      }
      if (webViewRef.current) {
        webViewRef.current.goBack()
        return true // 이벤트 소비
      }

      return false
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.container,
          {
            paddingBottom: Platform.OS === 'ios' ? -34 : insets.bottom,
            paddingTop: insets.top,
          },
        ]}
      >
        <WebView
          ref={webViewRef}
          source={{
            uri: 'http://192.168.1.163:5173/',
            // uri: process.env.EXPO_PUBLIC_WEB_URL || 'http://127.0.0.1:5173/',
          }}
          onMessage={bridge.processMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          onError={(error) => console.error('WebView 에러:', error)}
          onLoadStart={() => console.log('WebView 로딩 시작...')}
          onLoadEnd={() => console.log('WebView 로딩 완료')}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030303',
  },
})
