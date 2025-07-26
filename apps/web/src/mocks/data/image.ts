import type {
  ImageUploadResponse,
  PresignedUrlResponse,
} from '@/entities/image/model/image.type'

interface IImage {
  presignedUrl: PresignedUrlResponse
  image: ImageUploadResponse
}

export const image: IImage = {
  presignedUrl: {
    presignedUrl: `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/image/f47697b1-a2c2-4a60-bf5e-29014159b9a9.jpg`,
    fileName: 'f47697b1-a2c2-4a60-bf5e-29014159b9a9.jpg',
  },
  image: {
    imageId: 1,
    imageUrl:
      'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/f47697b1-a2c2-4a60-bf5e-29014159b9a9.jpg',
    createdAt: '2025-07-23T16:51:24.815Z',
    userId: 1,
    matchesId: 1,
    recordId: 1,
  },
}
