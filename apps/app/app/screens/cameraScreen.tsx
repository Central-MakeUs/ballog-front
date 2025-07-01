// app/screens/cameraScreen.tsx
import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
} from 'react-native'
import {
  CameraView,
  CameraType,
  FlashMode,
  useCameraPermissions,
} from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function CameraScreen() {
  const router = useRouter()
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions()
  const [facing, setFacing] = useState<CameraType>('back')
  const [flash, setFlash] = useState<FlashMode>('off')
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)
  const cameraRef = useRef<CameraView>(null)

  useEffect(() => {
    // 권한 요청
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

  const takePicture = async () => {
    if (!cameraRef.current) return

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
        exif: true,
      })

      if (photo) {
        console.log('📸 촬영 완료:', photo.uri)
        setCapturedPhoto(photo.uri)

        // 사진 저장 옵션 보여주기
        Alert.alert('사진 저장', '사진을 어디에 저장하시겠습니까?', [
          {
            text: '갤러리에 저장',
            onPress: () => saveToGallery(photo.uri),
          },
          {
            text: '앱 내부 임시저장',
            onPress: () => saveToAppStorage(photo.uri),
          },
          {
            text: '취소',
            style: 'cancel',
          },
        ])
      }
    } catch (error) {
      console.error('사진 촬영 에러:', error)
      Alert.alert('에러', '사진 촬영 중 오류가 발생했습니다.')
    }
  }

  // 갤러리(카메라롤)에 저장
  const saveToGallery = async (photoUri: string) => {
    try {
      if (mediaLibraryPermission?.status !== 'granted') {
        const { status } = await requestMediaLibraryPermission()
        if (status !== 'granted') {
          Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.')
          return
        }
      }

      const asset = await MediaLibrary.createAssetAsync(photoUri)
      console.log('갤러리 저장 완료:', asset.uri)

      Alert.alert('저장 완료', '사진이 갤러리에 저장되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            // WebView로 결과 전달하고 돌아가기
            sendPhotoToWebView(asset.uri)
            router.back()
          },
        },
      ])
    } catch (error) {
      console.error('갤러리 저장 실패:', error)
      Alert.alert('에러', '갤러리 저장에 실패했습니다.')
    }
  }

  // 앱 내부 저장소에 저장
  const saveToAppStorage = async (photoUri: string) => {
    try {
      // 앱 내부 Documents 디렉토리에 저장
      const fileName = `photo_${Date.now()}.jpg`
      const newUri = `${FileSystem.documentDirectory}${fileName}`

      await FileSystem.copyAsync({
        from: photoUri,
        to: newUri,
      })

      console.log('앱 내부 저장 완료:', newUri)

      Alert.alert(
        '저장 완료',
        `앱 내부 저장소에 저장되었습니다.\n경로: ${fileName}`,
        [
          {
            text: '확인',
            onPress: () => {
              sendPhotoToWebView(newUri)
              router.back()
            },
          },
        ],
      )
    } catch (error) {
      console.error('앱 내부 저장 실패:', error)
      Alert.alert('에러', '저장에 실패했습니다.')
    }
  }

  // WebView로 사진 정보 전달
  const sendPhotoToWebView = (photoUri: string) => {
    // WebView로 메시지 전송 로직
    // 실제로는 WebView ref를 통해 postMessage 호출
    console.log('WebView로 전송할 사진:', photoUri)
  }

  const handleClose = () => {
    router.back()
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
        allowsEditing: true, // 편집 허용 (크롭 등)
        aspect: [4, 3], // 편집 시 비율
        quality: 1, // 이미지 품질 (0-1)
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0]
        console.log('선택된 이미지:', selectedImage.uri)

        // 선택된 이미지 처리
        handleSelectedImage(selectedImage.uri)
      }
    } catch (error) {
      console.error('갤러리 접근 에러:', error)
      Alert.alert('에러', '갤러리를 여는 중 오류가 발생했습니다.')
    }
  }

  // 선택된 이미지 처리
  const handleSelectedImage = (imageUri: string) => {
    Alert.alert('이미지 선택됨', '선택한 이미지를 어떻게 처리하시겠습니까?', [
      {
        text: '웹뷰로 전송',
        onPress: () => {
          sendPhotoToWebView(imageUri)
          router.back()
        },
      },
      {
        text: '다시 선택',
        onPress: () => pickImageFromGallery(),
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>촬영하기</Text>
        <View style={styles.placeholder} />
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
          <Text style={{ color: '#000' }}>갤러리</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
        >
          <Ionicons name="camera-reverse" size={30} color="white" />
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
    margin: 16,
    borderRadius: 16,
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
