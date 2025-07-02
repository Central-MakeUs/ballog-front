// app/screens/photoResultScreen.tsx
import { View, StyleSheet, Image, TouchableOpacity, Text, SafeAreaView } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>촬영하기</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.photoContainer}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
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
    justifyContent: 'space-between',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  closeButton: { color: '#fff', fontSize: 20 },
  photoContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  retakeButton: {
    backgroundColor: '#aaa',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retakeText: {
    color: '#333',
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#26c6da',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  uploadText: {
    color: '#fff',
    fontWeight: '600',
  },
})
