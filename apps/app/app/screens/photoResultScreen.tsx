import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Linking,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function PhotoResultScreen() {
  const router = useRouter()
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>()

  const handleRetake = () => {
    router.back()
  }

  const handleUpload = () => {
    console.log('사진:', photoUri)
    // 업로드 로직 추가하기
  }

  // 그냥 뒤로가기 2번 함
  const handleClose = () => {
    router.back()
    setTimeout(() => {
      router.back()
    }, 1)
  }

  return (
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
