import { StyleSheet, SafeAreaView } from 'react-native'
import { useRef } from 'react'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { useRouter } from 'expo-router'
import type { PostMessagePayload } from '@ballog/bridge'
import { getMetroServerUrl } from '@/scripts/getMetroUrl'

const HomeScreen = () => {
  const webViewRef = useRef<WebView>(null)
  const router = useRouter()

  const webViewUri = getMetroServerUrl()

  const handleMessage = (event: WebViewMessageEvent) => {
    const data = event.nativeEvent.data

    if (!data) {
      console.warn('수신된 데이터 없음')
      return
    }

    try {
      const message = JSON.parse(data)

      if (typeof message !== 'object' || message === null) {
        throw new Error('데이터 타입 불일치')
      }

      console.log('RN 수신:', message)

      switch (message.eventName) {
        case 'OPEN_CAMERA':
          if (validateOpenCameraPayload(message.payload)) {
            console.log('RN: 카메라 열기 요청 처리')
            router.push('/screens/cameraScreen')
          } else {
            console.warn('RN: OPEN_CAMERA payload 불일치', message.payload)
          }
          break

        default:
          console.warn('RN: 알 수 없는 eventName 수신', message.eventName)
      }
    } catch (err) {
      console.error('RN: 메시지 파싱 실패', err, data)
    }
  }

  const validateOpenCameraPayload = (
    payload: PostMessagePayload,
  ): payload is { message: string } => {
    return (
      typeof payload === 'object' &&
      payload !== null &&
      typeof payload.message === 'string'
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: webViewUri }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        onError={(error) => console.error('WebView 에러:', error)}
        onLoadStart={() => console.log('WebView 로딩 시작...')}
        onLoadEnd={() => console.log('WebView 로딩 완료')}
      />
    </SafeAreaView>
  )
}

export { HomeScreen }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
