import * as FileSystem from 'expo-file-system'

/**
 * fileUri를 base64 data URI로 변환
 * @param fileUri 'file://...' 형태의 로컬 이미지 URI
 * @returns 'data:image/jpeg;base64,...'
 */
export const useBase64Image = () => {
  const encode = async (fileUri: string): Promise<string> => {
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    })
    return `data:image/jpeg;base64,${base64}`
  }

  return { encode }
}
