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
      base64: true,
      allowsMultipleSelection: true, // 여러장 선택 허용
      selectionLimit: 10, // 최대 10장까지 선택 가능 (선택사항)
    })

    if (!result.canceled && result.assets?.length > 0) {
      try {
        // 여러 이미지를 처리
        const imageDataList = await Promise.all(
          result.assets.map(async (asset) => {
            const base64 = await FileSystem.readAsStringAsync(asset.uri, {
              encoding: FileSystem.EncodingType.Base64,
            })

            return {
              uri: asset.uri,
              base64: `data:image/jpeg;base64,${base64}`,
              fileName:
                asset.fileName ||
                `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`,
              createdAt: new Date().toISOString(),
            }
          }),
        )

        // 여러 이미지 데이터를 한 번에 전송
        bridge.send(POST_MESSAGE_EVENT.IMAGE_SELECTED, {
          message: 'images_selected',
          imageDataList, // 배열로 전송
        })
      } catch (error) {
        console.error('RN: 이미지 처리 중 오류:', error)
      }
    }
  },
})
