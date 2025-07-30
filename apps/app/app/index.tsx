import { StyleSheet, BackHandler } from 'react-native'
import { useEffect, useRef } from 'react'

import { WebView, WebViewMessageEvent } from 'react-native-webview'

import { useImageBridge } from '../shared/contexts/imageBridgeContext'
import { useRouter } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useBridge } from './bridge/bridgeHandler'
import type { PostMessagePayload } from '@ballog/bridge'
import { useImageSender } from './bridge/hooks/useImageSender'

const HomeScreen = () => {
  const webViewRef = useRef<WebView>(null)
  const { bridge } = useBridge(webViewRef)
  const router = useRouter()
  const { base64Image, clearBase64Image } = useImageBridge()

  useImageSender(bridge, base64Image, clearBase64Image)

  // 뒤로가기 버튼 처리
  useEffect(() => {
    const backAction = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack()
        return true // 이벤트 소비
      }
      return false // 기본 동작 허용
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [])

  // 김용희 uri : http://192.168.0.12:5173/

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{
            uri: 'http://192.168.0.11:5173/',
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
  },
})
