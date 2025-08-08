import { useState, useEffect } from 'react'
import { Alert } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'

import { useRouter } from 'expo-router'

export const useGallery = (router: ReturnType<typeof useRouter>) => {
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions()
  const [latestPhotoUri, setLatestPhotoUri] = useState<string | null>(null)

    useEffect(() => {
      if (mediaLibraryPermission?.status === 'granted') {
        getGalleryThumbnail().then((uri) => setLatestPhotoUri(uri ?? null))
      }
    }, [mediaLibraryPermission])

  useEffect(() => {
    if (
      !mediaLibraryPermission ||
      mediaLibraryPermission.status !== 'undetermined'
    ) {
      requestMediaLibraryPermission()
    }
  }, [mediaLibraryPermission, requestMediaLibraryPermission])

  useEffect(() => {
    const loadLatestPhoto = async () => {
      if (mediaLibraryPermission?.status !== 'granted') return

      const uri = await getGalleryThumbnail()
      setLatestPhotoUri(uri ?? null)
    }

    loadLatestPhoto()
  }, [mediaLibraryPermission])


  const getGalleryThumbnail = async () => {
    try {
      const assets = await MediaLibrary.getAssetsAsync({
        sortBy: [['creationTime', false]],
        mediaType: 'photo',
        first: 1,
      })
      if (assets.assets.length > 0) {
        const assetInfo = await MediaLibrary.getAssetInfoAsync(
          assets.assets[0].id,
        )
        return assetInfo.localUri
      }
      return null
    } catch (e) {
      console.error('갤러리 썸네일 로드 실패:', e)
      return null
    }
  }

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.canceled && result.assets?.length > 0) {
      router.push({
        pathname: '/screens/photoResultScreen',
        params: { photoUri: result.assets[0].uri },
      })
    }
  }

  return {
    latestPhotoUri,
    pickImageFromGallery,
  }
}
