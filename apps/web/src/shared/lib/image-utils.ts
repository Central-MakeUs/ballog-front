/**
 * base64 문자열을 File 객체로 변환
 */
export const base64ToFile = (
  base64: string,
  fileName: string,
  mimeType: string = 'image/jpeg',
): File => {
  // base64에서 data URL 부분 제거
  const base64Data = base64.replace(/^data:image\/[a-z]+;base64,/, '')

  // base64를 바이너리로 변환
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: mimeType })

  return new File([blob], fileName, { type: mimeType })
}

/**
 * base64 문자열에서 MIME 타입을 추출
 */
export const getMimeTypeFromBase64 = (base64: string): string => {
  const match = base64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/)
  return match ? match[1] : 'image/jpeg'
}

/**
 * S3 URL에서 파일명을 추출
 */
export const extractFileNameFromUrl = (url: string): string => {
  return url.split('/').pop() || ''
}
