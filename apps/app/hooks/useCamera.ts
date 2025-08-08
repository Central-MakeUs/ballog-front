import React, { useState, useEffect } from 'react'

import {
  CameraView,
  CameraType,
  FlashMode,
  useCameraPermissions,
} from 'expo-camera'

import { useRouter } from 'expo-router'
import { Gesture } from 'react-native-gesture-handler'
import { useSharedValue, runOnJS } from 'react-native-reanimated'

export const useCamera = (
  cameraRef: React.RefObject<CameraView>,
  router: ReturnType<typeof useRouter>,
) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [facing, setFacing] = useState<CameraType>('back')
  const [flash, setFlash] = useState<FlashMode>('off')
  const [zoom, setZoom] = useState(0)
  const savedZoom = useSharedValue(0)

  // 카메라 권한 요청을 더 적극적으로 처리
  useEffect(() => {
    if (cameraPermission?.status !== 'granted') {
      requestCameraPermission()
    }
  }, [cameraPermission, requestCameraPermission])

  // 컴포넌트가 마운트될 때마다 카메라 권한 확인
  useEffect(() => {
    const checkPermission = async () => {
      if (cameraPermission?.status !== 'granted') {
        await requestCameraPermission()
      }
    }
    checkPermission()
  })

  const takePicture = async () => {
    if (!cameraRef.current) return
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
  }

  const updateZoom = (newZoom: number) => setZoom(newZoom)

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      const sensitivity = 0.1
      const newZoom = Math.max(
        0,
        Math.min(savedZoom.value + (event.scale - 1) * sensitivity, 1),
      )
      runOnJS(updateZoom)(newZoom)
    })
    .onEnd((event) => {
      const sensitivity = 0.1
      const finalZoom = Math.max(
        0,
        Math.min(savedZoom.value + (event.scale - 1) * sensitivity, 1),
      )
      savedZoom.value = finalZoom
    })

  return {
    cameraPermission,
    requestCameraPermission,
    facing,
    setFacing,
    flash,
    setFlash,
    zoom,
    takePicture,
    pinchGesture,
  }
}
