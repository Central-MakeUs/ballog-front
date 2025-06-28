import Constants from 'expo-constants'

export function getMetroServerUrl() {
  const manifest = Constants.expoConfig

  const originalDebuggerHost = manifest?.hostUri

  const webviewDebuggerUri = originalDebuggerHost
    ? 'http://' + originalDebuggerHost?.replace(/:\d+$/, ':5173/')
    : 'http://192.168.0.101:5173/'

  console.log(webviewDebuggerUri)
  return webviewDebuggerUri
}
