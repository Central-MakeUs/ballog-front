import { StyleSheet, SafeAreaView, BackHandler } from 'react-native'
import { useEffect, useRef } from 'react'
import { WebView } from 'react-native-webview'

import { getMetroServerUrl } from '@/scripts/getMetroUrl'
import { useBridge } from './bridge/bridgeHandler'

const HomeScreen = () => {
  const webViewRef = useRef<WebView>(null)
  const { bridge } = useBridge(webViewRef)

  const webViewUri = getMetroServerUrl() + '/record'

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

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: webViewUri }}
        onMessage={bridge.processMessage}
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
