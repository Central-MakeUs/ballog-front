import { StyleSheet, SafeAreaView, BackHandler } from 'react-native'
import { useRef, useEffect } from 'react'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { getMetroServerUrl } from '@/scripts/getMetroUrl'

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null)

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

  const handleMessage = (event: WebViewMessageEvent) => {
    console.log('WebView 메시지:', event.nativeEvent.data)
  }
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: getMetroServerUrl() + 'login' }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onError={(error) => console.error('WebView 에러:', error)}
        onLoadStart={() => console.log('WebView 로딩 시작...')}
        onLoadEnd={() => console.log('WebView 로딩 완료')}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
