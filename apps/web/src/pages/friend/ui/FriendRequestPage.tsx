import { AppScreen } from '@stackflow/plugin-basic-ui'

import { BackArrow } from '@/assets/BackArrow'

import { ReceivedRequestList } from './ReceivedRequestList'

export const FriendRequestPage = () => {
  return (
    <AppScreen
      appBar={{
        title: (
          <span className="text-usage-text-default body-md-bold">
            친구 요청
          </span>
        ),
        backButton: {
          renderIcon: () => (
            <BackArrow className="dark:text-brand-neutral-white light:text-brand-neutral-70" />
          ),
        },
        height: '48px',
      }}
      preventSwipeBack={true}
    >
      <div className="flex flex-col w-full h-full bg-usage-background-default">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <main className="flex flex-col flex-1 px-4 pt-6 pb-8">
            <ReceivedRequestList />
          </main>
        </div>
      </div>
    </AppScreen>
  )
}

export default FriendRequestPage
