import { Platform } from 'react-native'
import { router } from 'expo-router'

export const createCameraHandler = () => ({
  OPEN_CAMERA: () => {
    console.log('RN: 카메라 열기 요청 처리')

    const route = Platform.OS === 'ios'
      ? '/screens/iosCameraScreen'
      : '/screens/cameraScreen'

    router.push(route)
  },
})