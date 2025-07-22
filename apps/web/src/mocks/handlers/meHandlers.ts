import { http, HttpResponse, delay } from 'msw'

import { me } from '@/mocks/data/me'

const ME_API_PREFIX = `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/mypage`

export const meHandlers = [
  http.get(`${ME_API_PREFIX}/user`, async () => {
    await delay(me.delay)

    return HttpResponse.json({
      message: 'Success',
      statusCode: 200,
      data: me.data,
    })
  }),
]
