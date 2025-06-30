import { View, Text, StyleSheet } from 'react-native'
import { createAppBridge } from '@ballog/bridge'
import { useRef } from 'react'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null)
  // const bridge = createAppBridge(webViewRef)

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data)
      console.log(data)
    } catch (e) {
      console.log('RN 메시지 파싱 실패:', e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Wwwoorrlldd</Text>
      <WebView
        ref={webViewRef}
        source={{ uri: 'http://localhost:5173' }}
        onMessage={handleMessage}
        style={StyleSheet.absoluteFill}
        // 필수 설정
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        // 디버깅 로그
        onError={(error) => console.error('WebView 에러:', error)}
        onLoadStart={() => console.log('⏳ WebView 로딩 시작...')}
        onLoadEnd={() => console.log('✅ WebView 로딩 완료')}
      />
      <Text>ㅎㅎㅎ</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
