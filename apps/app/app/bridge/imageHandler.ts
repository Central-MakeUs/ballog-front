import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import Share, { Social } from 'react-native-share'
import {
  POST_MESSAGE_EVENT,
  MESSAGE_STATUS,
  type AppBridge,
  type ImageDownloadPayload,
  InstagramSharePayload,
} from '@ballog/bridge'
import { Alert } from 'react-native'

const EXPO_PUBLIC_FACEBOOK_APP_ID = process.env.EXPO_PUBLIC_FACEBOOK_APP_ID

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
      selectionLimit: 5, // 최대 5장까지 선택 가능
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
          message: MESSAGE_STATUS.IMAGES_SELECTED,
          imageDataList, // 배열로 전송
        })
      } catch (error) {
        console.error('RN: 이미지 처리 중 오류:', error)
      }
    }
  },

  DOWNLOAD_IMAGE: async (payload?: ImageDownloadPayload) => {
    if (!payload) return
    console.log('RN: 이미지 다운로드 요청 처리', payload)

    try {
      // 미디어 라이브러리 권한 요청
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          '권한 필요',
          '이미지를 저장하려면 갤러리 접근 권한이 필요합니다.',
        )
        return
      }

      // 파일명 생성 (없으면 기본값 사용)
      const fileName = `ballog_image_${Date.now()}.jpg`

      // 임시 파일 경로 생성
      const customDir = `${FileSystem.documentDirectory}ballog-images/`
      await FileSystem.makeDirectoryAsync(customDir, { intermediates: true })
      const fileUri = `${customDir}${fileName}`

      // S3 URL에서 이미지를 로컬로 다운로드
      const downloadResult = await FileSystem.downloadAsync(
        payload.imageUrl,
        fileUri,
      )

      if (!downloadResult.uri) {
        throw new Error('이미지 다운로드 실패')
      }

      // 다운로드된 로컬 파일을 갤러리에 저장
      const asset = await MediaLibrary.saveToLibraryAsync(downloadResult.uri)

      // 임시 파일 삭제
      await FileSystem.deleteAsync(fileUri, { idempotent: true })

      console.log('이미지 저장 완료:', asset)
      bridge.send(POST_MESSAGE_EVENT.IMAGE_DOWNLOAD_RESPONSE, {
        message: MESSAGE_STATUS.DOWNLOAD_COMPLETED,
      })
    } catch (error) {
      console.error('RN: 이미지 다운로드 중 오류:', error)
      bridge.send(POST_MESSAGE_EVENT.IMAGE_DOWNLOAD_RESPONSE, {
        message: MESSAGE_STATUS.DOWNLOAD_FAILED,
      })
    }
  },

  SHARE_TO_INSTAGRAM_STORY: async (payload?: InstagramSharePayload) => {
    if (!payload) return
    console.log('RN: 인스타그램 스토리 공유 요청 처리', payload)

    try {
      // 이미지를 임시 디렉토리에 다운로드
      const fileName = `ballog_share_${Date.now()}.jpg`
      const customDir = `${FileSystem.documentDirectory}ballog-temp/`
      await FileSystem.makeDirectoryAsync(customDir, { intermediates: true })
      const fileUri = `${customDir}${fileName}`

      // S3 URL에서 이미지를 로컬로 다운로드
      const downloadResult = await FileSystem.downloadAsync(
        payload.imageUrl,
        fileUri,
      )

      if (!downloadResult.uri) {
        throw new Error('이미지 다운로드 실패')
      }

      console.log('다운로드 결과 URI:', downloadResult.uri)
      const imagePath = downloadResult.uri

      console.log('원본 이미지 URL:', payload.imageUrl)
      console.log('로컬 이미지 경로:', imagePath)

      // 인스타그램 스토리 공유 옵션
      await Share.shareSingle({
        social: Social.InstagramStories,
        appId: EXPO_PUBLIC_FACEBOOK_APP_ID ?? '',
        backgroundImage: downloadResult.uri,
        backgroundBottomColor: '#837DF4',
        backgroundTopColor: '#906df4',
      })

      // 임시 파일 삭제
      await FileSystem.deleteAsync(fileUri, { idempotent: true })

      bridge.send(POST_MESSAGE_EVENT.INSTAGRAM_SHARE_RESPONSE, {
        message: MESSAGE_STATUS.SHARE_COMPLETED,
      })
    } catch (error) {
      console.error('RN: 인스타그램 스토리 공유 중 오류:', error)

      // 임시 파일 정리
      try {
        const fileName = `ballog_share_${Date.now()}.jpg`
        const customDir = `${FileSystem.documentDirectory}ballog-temp/`
        const fileUri = `${customDir}${fileName}`
        await FileSystem.deleteAsync(fileUri, { idempotent: true })
      } catch (cleanupError) {
        console.error('임시 파일 정리 실패:', cleanupError)
      }

      if (error instanceof Error && error.message.includes('not installed')) {
        // 인스타그램이 설치되지 않은 경우
        Alert.alert(
          '인스타그램 필요',
          '인스타그램 앱이 설치되어 있지 않습니다. 인스타그램을 설치한 후 다시 시도해주세요.',
        )
        bridge.send(POST_MESSAGE_EVENT.INSTAGRAM_SHARE_RESPONSE, {
          message: MESSAGE_STATUS.SHARE_FAILED,
        })
      } else {
        // 기타 오류
        Alert.alert(
          '공유 실패',
          '인스타그램 스토리 공유에 실패했습니다. 다시 시도해주세요.',
        )
        bridge.send(POST_MESSAGE_EVENT.INSTAGRAM_SHARE_RESPONSE, {
          message: MESSAGE_STATUS.SHARE_FAILED,
        })
      }
    }
  },
})
