import { StyleSheet, SafeAreaView, BackHandler } from 'react-native'
import { useEffect, useRef } from 'react'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { getMetroServerUrl } from '@/scripts/getMetroUrl'
import { useImageBridge } from '@/shared/contexts/imageBridgeContext'
import { useRouter } from 'expo-router'
import { useBridge } from './bridge/bridgeHandler'
import type { PostMessagePayload } from '@ballog/bridge'

const HomeScreen = () => {
  const webViewRef = useRef<WebView>(null)
  const { bridge } = useBridge(webViewRef)
  const router = useRouter()
  const { base64Image, clearBase64Image } = useImageBridge()

  const webViewUri = getMetroServerUrl()

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

  useEffect(() => {
    if (base64Image && webViewRef.current) {
      console.log('[RN] WebView에 메시지 전송 준비')

      const timeout = setTimeout(() => {
        console.log('[RN] 메시지 전송 시작')
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: 'image',
            payload: base64Image,
          }),
        )
        clearBase64Image()
      }, 1500) // 너무 짧으면 WebView 아직 준비 안 됐을 수 있음

      return () => clearTimeout(timeout)
    }
  }, [base64Image])

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

      // Web 메시지 수신 확인용 조건문
      if (message.type === 'echo_log') {
        console.log('[RN] 웹에서 다시 받은 base64 preview:', message.message)
        return
      }

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

  const combinedMessageHandler = (event: WebViewMessageEvent) => {
    bridge.processMessage(event)
    handleMessage(event)
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
        onMessage={combinedMessageHandler}
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

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
