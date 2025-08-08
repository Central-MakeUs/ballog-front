import { Stack } from '@/shared/lib/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'
import { SessionProvider } from '@/shared/contexts/sessionContext'
import { Toaster } from '@/shared/ui/common/Sonner'
import { OverlayProvider } from '@/shared/hooks/useOverlay'
import { useFcmToken } from '@/features/fcm/hooks/useFcmToken'

const App = () => {
  useFcmToken()
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({
      eventName: 'SEND_IMAGE_ECHO',
      payload: `서버가 준 액세스토큰 : ${localStorage.getItem('accessToken')}`,
    }),
  )
  // localStorage.clear()
  // localStorage.setItem("accessToken", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiZXhwIjoxNzU0NzQzMjMxfQ.VDUmrhMgvRG7U8rgjz19OU0_z-r2Q-LqCy7dNWlcH5g")
  localStorage.getItem("accessToken")
  return (
    <SessionProvider>
      <OverlayProvider>
        <QueryProvider>
          <Stack />
          <Toaster position="bottom-center" />
        </QueryProvider>
      </OverlayProvider>
    </SessionProvider>
  )
}

export default App
