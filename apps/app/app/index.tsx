import { StyleSheet, BackHandler } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { WebView } from 'react-native-webview'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useBridge } from './bridge/bridgeHandler'

const HomeScreen = () => {
  const webViewRef = useRef<WebView>(null)
  const { bridge } = useBridge(webViewRef)
  const [accessToken, setAccessToken] = useState<string>('')

  // 뒤로가기 버튼 처리
  useEffect(() => {
    const backAction = () => {
      if (webViewRef.current) {
        webViewRef.current.goBack()
        return true // 이벤트 소비
      }
      return false // 기본 동작 허용
    }

    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        if (token) {
          setAccessToken(token)
        }
      } catch (error) {
        console.error('토큰 로드 실패:', error)
      }
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    loadToken()
    return () => backHandler.remove()
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{
            uri: process.env.EXPO_PUBLIC_WEB_URL || 'http://127.0.0.1:5173/',
          }}
          onMessage={bridge.processMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          onError={(error) => console.error('WebView 에러:', error)}
          onLoadStart={() => console.log('WebView 로딩 시작...')}
          onLoadEnd={() => console.log('WebView 로딩 완료')}
          injectedJavaScript={`
            window.accessToken = '${accessToken}';
            window.localStorage.setItem('accessToken', '${accessToken}');
          `}
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
