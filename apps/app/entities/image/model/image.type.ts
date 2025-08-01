export interface ImageUploadRequestDTO {
  recordId: number
  imageUrl: string
}

export interface ImageUploadResponseDTO {
  message: string
  status: string
  success: string
  data: {
    imageId: number
    imageUrl: string
    createdAt: string
    userId: number
    matchId: number
    recordId: number
  }
}