import { http, HttpResponse, delay } from 'msw'

import type {
  ImageUploadResponseDTO,
  ImageRequestDTO,
  PresignedUrlResponse,
  PresignedUrlResponseDTO,
} from '@/entities/image/model/image.type'
import type { ApiErrorMessage } from '@/types/api/common'
import { image } from '@/mocks/data/image'

const IMAGE_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/image`

// 유효한 이미지 확장자 목록
const VALID_IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.bmp',
  '.svg',
]

const isValidImageFileName = (fileName: string): boolean => {
  if (!fileName) return false

  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))
  return VALID_IMAGE_EXTENSIONS.includes(extension)
}

export const imageHandlers = [
  http.post<never, ImageRequestDTO, ApiErrorMessage | ImageUploadResponseDTO>(
    `${IMAGE_API_PREFIX}`,
    async ({ request }) => {
      const { recordId, imageUrl } = await request.json()

      await delay(1000)

      if (recordId && imageUrl) {
        return HttpResponse.json<ImageUploadResponseDTO>(
          {
            data: image.image,
            status: 200,
            message: 'Success',
            success: '이미지 업로드 성공',
          },
          {
            status: 200,
          },
        )
      }
    },
  ),
  http.get<
    never,
    PresignedUrlResponse,
    ApiErrorMessage | PresignedUrlResponseDTO
  >(`${IMAGE_API_PREFIX}/presigned-url`, async ({ request }) => {
    const url = new URL(request.url)
    const originalFileName = url.searchParams.get('originalFileName')

    // 파일명이 없는 경우
    if (!originalFileName) {
      return HttpResponse.json<ApiErrorMessage>(
        {
          message: 'originalFileName parameter is required',
          status: 400,
          error: 'originalFileName parameter is required',
          code: 'IMAGE_001',
        },
        { status: 400 },
      )
    }

    // 유효하지 않은 이미지 파일인 경우
    if (!isValidImageFileName(originalFileName)) {
      return HttpResponse.json<ApiErrorMessage>(
        {
          message: 'fail',
          status: 411,
          error: '유효하지 않은 파일 형식입니다.',
          code: 'FILE_001',
        },
        { status: 400 },
      )
    }

    await delay(1000)

    return HttpResponse.json<PresignedUrlResponseDTO>(
      {
        message: 'success',
        status: 200,
        success: 'presignedUrl 요청 성공',
        data: image.presignedUrl,
      },
      {
        status: 200,
      },
    )
  }),
  // S3 이미지 업로드 모킹
  http.put<{ fileName: string }, never, never>(
    `${IMAGE_API_PREFIX}/:fileName`,
    async ({ params, request }) => {
      const { fileName } = params

      // 파일명 유효성 검사
      if (!isValidImageFileName(fileName)) {
        return HttpResponse.json<ApiErrorMessage>(
          {
            message: 'fail',
            status: 400,
            error: '유효하지 않은 파일 형식입니다.',
            code: 'FILE_001',
          },
          { status: 400 },
        )
      }

      try {
        // Request body 확인
        const requestBody = await request.text()

        // body에 데이터가 없는 경우
        if (!requestBody || requestBody.trim().length === 0) {
          return HttpResponse.json<ApiErrorMessage>(
            {
              message: 'fail',
              status: 400,
              error: '업로드할 파일 데이터가 없습니다.',
              code: 'FILE_002',
            },
            { status: 400 },
          )
        }

        // 업로드 시뮬레이션 딜레이
        await delay(2000)

        // S3 업로드 성공 모킹
        return new HttpResponse(null, {
          status: 200,
          headers: {
            ETag: '"9bb58f26192e4ba00f01e2e7b136bbd8"',
            'Content-Type': 'application/xml',
          },
        })
      } catch {
        return HttpResponse.json<ApiErrorMessage>(
          {
            message: 'fail',
            status: 500,
            error: '파일 처리 중 오류가 발생했습니다.',
            code: 'FILE_003',
          },
          { status: 500 },
        )
      }
    },
  ),
]
