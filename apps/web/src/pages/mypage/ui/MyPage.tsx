import { AppScreen } from '@stackflow/plugin-basic-ui'

import { cn } from '@/shared/lib/classnames'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { OverlayProvider } from '@/hooks/useOverlay'
import { ChangeMyInfoWidget } from '@/widgets/changeMyInfoWidget/ChangeMyInfoWidget'
import { AlarmToggleList } from '@/features/auth/ui/AlarmSwitchList'
import { OtherLinkList } from '@/features/auth/ui/OtherLinkList'
import { LogoutAndWithdrawButtons } from '@/features/auth/ui/LogoutAndWithDrawButtons'

const MyPageInner = () => {
  return (
    <AppScreen
      appBar={{
        title: <span className="flex text-usage-text-default">마이페이지</span>,
        height: '48px',
      }}
    >
      <div className={cn('flex flex-col w-full px-4 py-4 pb-27.5')}>
        <div>
          <p className="body-sm-bold text-brand-neutral-white">내 정보</p>
          <ChangeMyInfoWidget />
        </div>
        <AlarmToggleList />

        <OtherLinkList />

        <LogoutAndWithdrawButtons />

        <GlobalNavigationBar />
      </div>
    </AppScreen>
  )
}

const MyPage = () => {
  return (
    <OverlayProvider>
      <MyPageInner />
    </OverlayProvider>
  )
}

export default MyPage
