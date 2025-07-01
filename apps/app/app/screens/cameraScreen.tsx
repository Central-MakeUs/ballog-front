import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// 카메라 라이브러리는 예: react-native-vision-camera, expo-camera 등

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.cameraView}>
        <Text style={styles.placeholderText}>카메라 뷰 자리</Text>
        {/* 여기에 나중에 카메라 컴포넌트 연결 */}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button}>
          <Text>갤러리 버튼</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shutterButton}>
          <Text>촬영 버튼</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text>전면/후면</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.flashButton}>
        <Text>플래시</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  cameraView: {
    flex: 1,
    backgroundColor: '#ccc', // 회색 placeholder
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  placeholderText: {
    color: '#333',
    alignSelf: 'center',
    marginTop: '50%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 50,
    padding: 16,
  },
  shutterButton: {
    backgroundColor: '#ccc',
    borderRadius: 50,
    padding: 24,
  },
  flashButton: {
    position: 'absolute',
    bottom: 150,
    left: 32,
    backgroundColor: '#ccc',
    borderRadius: 25,
    padding: 12,
  },
})
