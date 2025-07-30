import * as FileSystem from 'expo-file-system'
import type { ImageData } from '@ballog/bridge/types'

/**
 * fileUri를 base64 data URI로 변환
 * @param fileUri 'file://...' 형태의 로컬 이미지 URI
 * @returns ImageData 객체
 */

export const useBase64Image = () => {
  const encode = async (fileUri: string): Promise<ImageData> => {
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    })

    const fileName = fileUri.split('/').pop() ?? `image_${Date.now()}.jpg`
    const ext = fileName.split('.').pop() ?? 'jpg'
    const mimeType = `image/${ext}`

    const fileInfo = await FileSystem.getInfoAsync(fileUri)

    let createdAt: string

    if (fileInfo.exists && fileInfo.modificationTime) {
      createdAt = new Date(fileInfo.modificationTime * 1000).toISOString()
    } else {
      createdAt = new Date().toISOString()
    }

    const imageData: ImageData = {
      uri: fileUri,
      base64: `data:${mimeType};base64,${base64}`,
      fileName,
      createdAt,
    }

    // console.log("디버깅용 imageData 출력",{ 
    //   ...imageData,
    //   base64: imageData.base64.slice(0, 50) + '...',
    // })

    return imageData
  }

  return { encode }
}
