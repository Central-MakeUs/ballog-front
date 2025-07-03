import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native'
import {
  CameraView,
  CameraType,
  FlashMode,
  useCameraPermissions,
} from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import FlipButton from '@/assets/images/flipButton.svg'

export default function CameraScreen() {
  const router = useRouter()

  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions()
  const [facing, setFacing] = useState<CameraType>('back')
  const [flash, setFlash] = useState<FlashMode>('off')
  const [latestPhotoUri, setLatestPhotoUri] = useState<string | null>(null)

  const cameraRef = useRef<CameraView>(null)

  // 권한 요청
  useEffect(() => {
    if (cameraPermission?.status !== 'granted') {
      requestCameraPermission()
    }
    if (
      !mediaLibraryPermission ||
      mediaLibraryPermission.status !== 'granted'
    ) {
      requestMediaLibraryPermission()
    }
  }, [cameraPermission, mediaLibraryPermission])

  // mediaLibraryPermission 권한 생기면 갤러리 최신 사진 불러오기
  useEffect(() => {
    const loadLatestPhoto = async () => {
      const uri = await getGalleryThumbnail()
      setLatestPhotoUri(uri ?? null)
    }

    loadLatestPhoto()
  }, [mediaLibraryPermission])

  const handleClose = () => {
    router.back()
  }

  const takePicture = async () => {
    if (!cameraRef.current) return

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
        exif: true,
      })

      if (photo?.uri) {
        router.push({
          pathname: '/screens/photoResultScreen',
          params: { photoUri: photo.uri },
        })
      }
    } catch (error) {
      console.error('사진 촬영 에러:', error)
      Alert.alert('에러', '사진 촬영 중 오류가 발생했습니다.')
    }
  }

  if (!cameraPermission || !cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>카메라 권한이 필요합니다</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestCameraPermission}
        >
          <Text>권한 요청</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // 갤러리에서 이미지 선택하는 함수
  const pickImageFromGallery = async () => {
    try {
      // 갤러리 권한 확인
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.')
        return
      }

      // 이미지 선택
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1, // 이미지 품질 (0-1)
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0]
        console.log('선택된 이미지:', selectedImage.uri)

        // 선택된 이미지 처리
        router.push({
          pathname: '/screens/photoResultScreen',
          params: { photoUri: selectedImage.uri },
        })
      }
    } catch (error) {
      console.error('갤러리 접근 에러:', error)
      Alert.alert('에러', '갤러리를 여는 중 오류가 발생했습니다.')
    }
  }

  // 갤러리 버튼 썸네일
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
        console.log('Asset info:', assetInfo)
        return assetInfo.localUri
      }

      return null
    } catch (error) {
      console.error('최신 사진 불러오기 실패:', error)
      return null
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <View style={styles.placeholder} />
        <Text style={styles.headerTitle}>촬영하기</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* 카메라 뷰 */}
      <View style={styles.cameraContainer}>
        <TouchableOpacity
          style={styles.flashButton}
          onPress={() => setFlash(flash === 'off' ? 'on' : 'off')}
        >
          <Ionicons
            name={flash === 'off' ? 'flash-off' : 'flash'}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <CameraView
          style={styles.camera}
          facing={facing}
          flash={flash}
          ref={cameraRef}
        />
        <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
          <View style={styles.shutterInner} />
        </TouchableOpacity>
      </View>

      {/* 하단 컨트롤 */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={styles.galleryButton}
          onPress={pickImageFromGallery}
        >
          {latestPhotoUri ? (
            <Image
              source={{ uri: latestPhotoUri }}
              style={styles.galleryThumbnail}
            />
          ) : (
            <Text style={{ color: '#000' }}>갤러리</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
        >
          <FlipButton />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeButton: {
    padding: 5,
  },
  cameraContainer: {
    flex: 1,
    // borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#333',
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  flashButton: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  flipButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
  },
  galleryButton: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  shutterButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  shutterInner: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#000',
  },
  placeholder: {
    width: 60,
  },
  permissionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    alignSelf: 'center',
  },
})
