import { Platform } from 'react-native'
import { router } from 'expo-router'

export const createCameraHandler = () => ({
  OPEN_CAMERA: () => {
    const route = Platform.OS === 'ios'
      ? '/screens/iosCameraScreen'
      : '/screens/cameraScreen'

    router.push(route)
  },
})