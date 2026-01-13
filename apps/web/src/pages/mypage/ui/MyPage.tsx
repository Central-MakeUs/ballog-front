import { AppScreen } from '@stackflow/plugin-basic-ui'

import { cn } from '@/shared/lib/classnames'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { ChangeMyInfoWidget } from '@/widgets/ChangeMyInfoWidget'
import { AlarmToggleList } from '@/features/mypage/ui/AlarmSwitchList'
import { OtherLinkList } from '@/widgets/otherListList/OtherLinkList'
import { LogoutAndWithdrawButtons } from '@/features/mypage/ui/LogoutAndWithDrawButtons'

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
          <p className="mb-4 body-sm-bold text-usage-text-default">내 정보</p>
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
  return <MyPageInner />
}

export default MyPage
