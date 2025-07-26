import { api } from '@/shared/lib/ky'

import type {
  PresignedUrlResponseDTO,
  ImageRequestDTO,
  ImageUploadResponseDTO,
} from '../model/image.type'

/**
 * presigned URL을 요청합니다
 */
export const getPresignedUrl = async (
  originalFileName: string,
): Promise<PresignedUrlResponseDTO> => {
  const response = await api
    .get(`image/presigned-url?originalFileName=${originalFileName}`)
    .json<PresignedUrlResponseDTO>()

  return response
}

/**
 * S3에 파일을 업로드합니다
 */
export const uploadToS3 = async (
  presignedUrl: string,
  file: File,
): Promise<void> => {
  // presigned URL로 직접 PUT 요청
  await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  })
}

/**
 * 서버에 이미지 정보를 저장합니다
 */
export const saveImageToServer = async (
  imageRequest: ImageRequestDTO,
): Promise<ImageUploadResponseDTO> => {
  const response = await api
    .post('image', {
      json: imageRequest,
    })
    .json<ImageUploadResponseDTO>()

  return response
}
