import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { POST_MESSAGE_EVENT, type AppBridge } from '@ballog/bridge'

export const createImageHandler = (bridge: AppBridge) => ({
  PICK_IMAGE: async () => {
    console.log('RN: 이미지 선택 요청 처리')

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      console.warn('RN: 갤러리 접근 권한이 필요합니다.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: false,
    })

    if (!result.canceled && result.assets?.length > 0) {
      const asset = result.assets[0]

      try {
        const base64 = await FileSystem.readAsStringAsync(asset.uri, {
          encoding: FileSystem.EncodingType.Base64,
        })

        bridge.send(POST_MESSAGE_EVENT.IMAGE_SELECTED, {
          message: 'image_selected',
          imageData: {
            uri: asset.uri,
            base64: `data:image/jpeg;base64,${base64}`,
            fileName: asset.fileName || `image_${Date.now()}.jpg`,
            createdAt: new Date().toISOString(),
          },
        })
      } catch (error) {
        console.error('RN: 이미지 처리 중 오류:', error)
      }
    }
  },
})
