import { AppScreen } from '@stackflow/plugin-basic-ui'

import { cn } from '@/shared/lib/classnames'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { OverlayProvider } from '@/hooks/useOverlay'
import { List } from '@/shared/ui/common/List/List'
import { ChangeMyInfoWidget } from '@/widgets/changeMyInfoWidget/ChangeMyInfoWidget'
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

        <div className="space-y-4 mb-6">
          <p className="body-sm-bold text-brand-neutral-white">알람 설정</p>
          <List type="switch">경기 시작 알림 받기</List>
          <List type="switch">경기 중 알림 받기</List>
        </div>

        <div className="space-y-4 mb-6">
          <p className="body-sm-bold text-brand-neutral-white">기타 등등</p>
          <List type="arrow">볼로그 인스타그램</List>
          <List type="arrow">문의하기</List>
          <List type="arrow">개인정보 처리방침</List>
          <List type="arrow">서비스 이용약관</List>
        </div>

        <div className="flex items-center gap-4 px-4 mt-4 mb-4">
          <LogoutAndWithdrawButtons />
        </div>
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
