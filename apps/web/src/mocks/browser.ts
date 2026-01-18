import { setupWorker } from 'msw/browser'

import { SubscribeStore } from '@/shared/lib/subscribeStore'

import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// MSW 활성화 상태
export let isMswEnabled = false

export const mswEnabledStore = SubscribeStore.getInstance<boolean>(
  'mswEnabled',
  () => isMswEnabled,
)

// 백엔드 health check
const checkBackendConnection = async (): Promise<boolean> => {
  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL

  if (!apiUrl) return false

  try {
    const response = await fetch(`${apiUrl}/api/v1/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(1000), // 1초 타임아웃
    })
    return response.ok
  } catch {
    return false
  }
}

// 백엔드 연결 실패 시에만 MSW 시작
export const startMocking = async () => {
  const isBackendConnected = await checkBackendConnection()

  if (isBackendConnected) {
    return
  }

  await worker.start()
  if (!isMswEnabled) {
    isMswEnabled = true
    mswEnabledStore.notify()
  }
}
