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
      payload: `액세스토큰 : ${localStorage.getItem('accessToken')}`,
    }),
  )
  // localStorage.setItem("accessToken", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNzU0NzM2MTc3fQ.dMgntIM7bn0-4Vd-AhNm-H0WfzCrbgFGoi9F5ZibIXQ")

  window.ReactNativeWebView?.postMessage(
    JSON.stringify({
      eventName: 'SEND_IMAGE_ECHO',
      payload: "dfdfdfdfdf",
    }),
  )
  // localStorage.clear()
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
