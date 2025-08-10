import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  BackHandler,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useBase64Image } from '@/hooks/useBase64Image'
import * as FileSystem from 'expo-file-system'
import { useImageBridge } from '@/shared/contexts/imageBridgeContext'
import { useEffect } from 'react'

export default function PhotoResultScreen() {
  const router = useRouter()
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>()
  const { encode } = useBase64Image()
  const { setImageData } = useImageBridge()

  const handleRetake = () => {
    router.back()
  }

  // TODO : 일단 recordId 하드코딩
  const handleUpload = async () => {
    if (!photoUri) return

    const fileInfo = await FileSystem.getInfoAsync(photoUri)
    if (!fileInfo.exists) {
      console.error('파일이 존재하지 않음:', photoUri)
      return
    }
    const imageData = await encode(photoUri)

    setImageData(imageData)
    handleClose()
  }

  useEffect(() => {
    const backAction = () => {
      if (router.canGoBack()) {
        router.back()
        return true // 이벤트 소비
      }

      // 더 이상 뒤로 갈 수 없으면 앱 종료
      BackHandler.exitApp()
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove()
  }, [router])

  // 그냥 뒤로가기 2번 함
  const handleClose = () => {
    // 카메라 화면을 건너뛰고 원래 화면으로 바로 이동
    router.back()
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.placeholder} />
          <Text style={styles.headerTitle}>촬영하기</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.photoContainer}>
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={styles.photo}
              resizeMode="cover"
            />
          ) : (
            <Text style={{ color: '#fff' }}>사진 없음</Text>
          )}
        </View>

        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <Text style={styles.retakeText}>다시 찍기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadText}>업로드</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
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
  closeButton: { padding: 5 },
  photoContainer: {
    flex: 1,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  bottomControls: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 8,
  },
  retakeButton: {
    flex: 1,
    backgroundColor: '#aaa',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retakeText: {
    color: '#333',
    fontWeight: '600',
  },
  uploadButton: {
    flex: 1,
    backgroundColor: '#26c6da',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: '#fff',
    fontWeight: '600',
  },
  placeholder: {
    width: 60,
  },
})
