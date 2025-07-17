import { AppScreen } from '@stackflow/plugin-basic-ui'
import { MyPageList } from './MyPageList'
import { cn } from '@/shared/lib/classnames'
import { GlobalNavigationBar } from '@/widgets/navigation'
import { useFlow } from '@/shared/lib/stackflow'
import { useModal } from '@/shared/hooks/modal/useModal'
import { OverlayProvider } from '@/hooks/useOverlay'

const MyPage = () => {
  return (
    <OverlayProvider>
      <MyPageInner />
    </OverlayProvider>
  )
}

const MyPageInner = () => {
  const { push } = useFlow()
  const { openHorizontalModal } = useModal()

  const HandleClickLogout = () => {
    openHorizontalModal({
      heading: '로그아웃 하시겠어요?',
      body: 'Body text',
      buttons: [
        { label: '취소', onClick: close },
        {
          label: '로그아웃',
          onClick: () => {
            close()
            // 로그아웃 로직 작성
          },
        },
      ],
    })
  }

  const HandleClickQuit = () => {
    openHorizontalModal({
      heading: '정말 탈퇴하시겠어요?',
      body: '탈퇴 시 서비스 내 모든 정보가 \n 삭제되어 복구할 수 없습니다.',
      buttons: [
        { label: '취소', onClick: close },
        {
          label: '탈퇴',
          onClick: () => {
            close()
            // 탈퇴 로직 작성
          },
        },
      ],
    })
  }

  return (
    <AppScreen
      appBar={{
        title: <span className="flex text-usage-text-default">마이페이지</span>,
        height: '48px',
      }}
    >
      <div className={cn('flex flex-col w-full px-4 py-4 pb-27.5')}>
        <div className="space-y-4 mb-6">
          <p className="body-sm-bold text-brand-neutral-white">내 정보</p>
          <MyPageList type="arrow" onClick={() => push('Home', {})}>
            응원 팀 변경
          </MyPageList>
          <MyPageList type="arrow" onClick={() => push('Home', {})}>
            닉네임 변경
          </MyPageList>
        </div>

        <div className="space-y-4 mb-6">
          <p className="body-sm-bold text-brand-neutral-white">알람 설정</p>
          <MyPageList type="switch">경기 시작 알림 받기</MyPageList>
          <MyPageList type="switch">경기 중 알림 받기</MyPageList>
        </div>

        <div className="space-y-4 mb-6">
          <p className="body-sm-bold text-brand-neutral-white">기타 등등</p>
          <MyPageList type="arrow" onClick={() => push('Home', {})}>
            볼로그 인스타그램
          </MyPageList>
          <MyPageList type="arrow" onClick={() => push('Home', {})}>
            문의하기
          </MyPageList>
          <MyPageList type="arrow" onClick={() => push('Home', {})}>
            개인정보 처리방침
          </MyPageList>
          <MyPageList type="arrow" onClick={() => push('Home', {})}>
            서비스 이용약관
          </MyPageList>
        </div>

        <div className="flex items-center gap-4 px-4 mt-4 mb-4">
          <button
            className="flex-1 text-center text-usage-text-hover body-sm-medium"
            onClick={HandleClickLogout}
          >
            로그아웃
          </button>
          <p className="body-sm-light text-usage-text-subtle">|</p>
          <button
            className="flex-1 text-center text-usage-text-hover body-sm-medium"
            onClick={HandleClickQuit}
          >
            탈퇴하기
          </button>
        </div>
        <GlobalNavigationBar />
      </div>
    </AppScreen>
  )
}

export default MyPage
