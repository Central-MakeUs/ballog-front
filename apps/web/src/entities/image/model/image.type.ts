import { type ApiResponse } from '@/types/api/common'

export interface PresignedUrlResponse {
  presignedUrl: string
  fileName: string
}

export interface ImageRequestDTO {
  matchRecordId: number
  imageUrl: string
}

export interface ImageUploadResponse {
  imageId: number
  imageUrl: string
  createdAt: string
  userId: number
  matchesId: number
  recordId: number
}

export type PresignedUrlResponseDTO = PresignedUrlResponse
export type ImageUploadResponseDTO = ApiResponse<ImageUploadResponse>
