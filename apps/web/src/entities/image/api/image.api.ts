import { api } from '@/shared/lib/ky'

import type {
  PresignedUrlResponseDTO,
  ImageRequestDTO,
  ImageUploadResponseDTO,
} from '../model/image.type'

export const getPresignedUrl = async (
  originalFileName: string,
): Promise<PresignedUrlResponseDTO> => {
  const response = await api
    .get(`image/presigned-url?originalFileName=${originalFileName}`)
    .json<PresignedUrlResponseDTO>()

  return response
}

export const uploadToS3 = async (
  presignedUrl: string,
  file: File,
): Promise<void> => {
  await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  })
}

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
