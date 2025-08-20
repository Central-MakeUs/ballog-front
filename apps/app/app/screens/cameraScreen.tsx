import React, { useRef, useState } from 'react'
import {
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Linking,
} from 'react-native'
import { CameraView } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, useFocusEffect } from 'expo-router'
import {
  GestureHandlerRootView,
  GestureDetector,
} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
// import FlipButton from '@/assets/images/flipButton.svg'
import { useCamera } from '@/hooks/useCamera'
import { useGallery } from '@/hooks/useGallery'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function CameraScreen() {
  const router = useRouter()
  const [cameraKey, setCameraKey] = useState(0)

  const cameraRef = useRef<CameraView>(null) as React.RefObject<CameraView>

  const openGalleryOrSettings = () => {
    Alert.alert(
      '갤러리 권한이 없어요',
      '갤러리 썸네일 표시와 사진 업로드를 위해 사진 보관함 접근이 필요합니다.',
      [
        { text: '취소', style: 'cancel' },
        { text: '설정 열기', onPress: () => Linking.openSettings() },
      ],
    )
  }

  const {
    cameraPermission,
    requestCameraPermission,
    facing,
    setFacing,
    flash,
    setFlash,
    zoom,
    takePicture,
    pinchGesture,
  } = useCamera(cameraRef, router)

  const { latestPhotoUri, pickImageFromGallery } = useGallery(router)

  // 화면이 포커스될 때마다 카메라를 재시작
  useFocusEffect(
    React.useCallback(() => {
      setCameraKey((prev) => prev + 1)
    }, []),
  )

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

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
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

            <GestureDetector gesture={pinchGesture}>
              <Animated.View style={styles.camera}>
                <CameraView
                  key={cameraKey}
                  style={styles.camera}
                  facing={facing}
                  flash={flash}
                  zoom={zoom}
                  ref={cameraRef}
                />
              </Animated.View>
            </GestureDetector>

            <TouchableOpacity
              style={styles.shutterButton}
              onPress={takePicture}
            >
              <View style={styles.shutterInner} />
            </TouchableOpacity>
            {zoom > 0 && (
              <View style={styles.zoomIndicator}>
                <Text style={styles.zoomText}>
                  {(zoom * 10 + 1).toFixed(1)}x
                </Text>
              </View>
            )}
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
                <TouchableOpacity onPress={openGalleryOrSettings}>
                  <View style={styles.galleryPlaceholder} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
            >
              <Ionicons name="camera-reverse" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
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
  zoomIndicator: {
    position: 'absolute',
    bottom: 110,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 1,
  },
  zoomText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
    backgroundColor: '#424242',
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  galleryPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#424242',
  },
  shutterButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  shutterInner: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#212121',
    borderWidth: 3,
    borderColor: '#fff',
  },
  placeholder: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
