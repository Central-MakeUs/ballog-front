import { Stack } from '@/shared/lib/stackflow'
import '@stackflow/plugin-basic-ui/index.css'
import QueryProvider from '@/app/Provider/QueryProvider'
import { SessionProvider } from '@/shared/contexts/sessionContext'
import { Toaster } from '@/shared/ui/common/Sonner'
import { OverlayProvider } from '@/shared/hooks/useOverlay'
import { useFcmToken } from '@/features/fcm/hooks/useFcmToken'

const App = () => {
  useFcmToken()
  // localStorage.clean()
  //   localStorage.setItem(
  //   "accessToken",
  //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNiIsImV4cCI6MTc1NDg5NjgzMX0.mVr5g6mioko3RBlO6MczT45TNMKFZsw0r8azkTS8ZD4"
  // );
  //  window.ReactNativeWebView?.postMessage(
  //       JSON.stringify({
  //         eventName: 'SEND_IMAGE_ECHO',
  //         payload: `액세스토큰 : ${localStorage.getItem("accessToken")}`,
  //       }),
  //     )

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
