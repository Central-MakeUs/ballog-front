import { AppScreen } from '@stackflow/plugin-basic-ui'

import { cn } from '@/shared/lib/classnames'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { OverlayProvider } from '@/hooks/useOverlay'
import { List } from '@/shared/ui/common/List/List'
import { ChangeMyInfoWidget } from '@/widgets/changeMyInfoWidget/ChangeMyInfoWidget'
import { LogoutAndWithdrawButtons } from '@/features/auth/ui/LogoutAndWithDrawButtons'
import { OtherLinkList } from '@/features/auth/ui/OtherLinkList'

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

        <div className="space-y-4 mb-6">
          <p className="body-sm-bold text-brand-neutral-white">알람 설정</p>
          <List type="switch">경기 시작 알림 받기</List>
          <List type="switch">경기 중 알림 받기</List>
        </div>

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
