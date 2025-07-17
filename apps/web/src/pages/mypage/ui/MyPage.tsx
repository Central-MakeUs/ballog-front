import { AppScreen } from '@stackflow/plugin-basic-ui'
import { ChangeTeamList } from './MyPageList'
import { cn } from '@/shared/lib/classnames'

const MyPage = () => {
  return (
    <AppScreen
      appBar={{
        title: <span className="flex text-usage-text-default">마이페이지</span>,
        height: '48px',
      }}
    >
      <div className={cn('flex flex-col w-full h-full px-4')}>
        mypage
        <ChangeTeamList />
        <button className='bg-amber-400 py-4'>
            버튼
        </button>
      </div>
    </AppScreen>
  )
}

export default MyPage
