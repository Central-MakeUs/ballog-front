import { axiosInstance } from '@/shared/lib/axiosInstance'
import type {
  ImageUploadRequestDTO,
  ImageUploadResponseDTO,
} from '@/entities/image/model/image.type'

export const imagePost = {
  postImage: async (
    payload: ImageUploadRequestDTO,
  ): Promise<ImageUploadResponseDTO> => {
    const response = await axiosInstance.post('/api/v1/image', payload)
    return response.data
  },
}
