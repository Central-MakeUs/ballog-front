import { useState } from 'react'
import { AppScreen } from '@stackflow/plugin-basic-ui'

import { BackArrow } from '@/assets/BackArrow'

import {
  FriendRequestListItem,
  type FriendRequestRecommendation,
} from './FriendRequestListItem'

const RECOMMENDED_FRIENDS: FriendRequestRecommendation[] = [
  { id: 'friend-1', name: '김 친구', emotionLabel: '화남70%' },
  { id: 'friend-2', name: '박 메이트', emotionLabel: '화남70%' },
  { id: 'friend-3', name: '이 응원단', emotionLabel: '화남70%' },
  { id: 'friend-4', name: '최 직관러', emotionLabel: '화남70%' },
  { id: 'friend-5', name: '정 원정팬', emotionLabel: '화남70%' },
  { id: 'friend-6', name: '한 홈런볼', emotionLabel: '화남70%' },
  { id: 'friend-7', name: '윤 캐치볼', emotionLabel: '화남70%' },
  { id: 'friend-8', name: '장 마운드', emotionLabel: '화남70%' },
  { id: 'friend-9', name: '오 타석러', emotionLabel: '화남70%' },
]

export const FriendRequestPage = () => {
  const [recommendedFriends, setRecommendedFriends] =
    useState(RECOMMENDED_FRIENDS)

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
        <div className="flex-1 overflow-y-auto">
          <main className="flex flex-col px-4 pt-6 pb-8">
            <h2 className="body-md-bold text-usage-text-default">
              내 구단 메이트 추천
            </h2>
            <section className="mt-4">
              <div>
                {recommendedFriends.map((friend) => (
                  <FriendRequestListItem
                    key={friend.id}
                    {...friend}
                    onDismiss={() => {
                      setRecommendedFriends((prevFriends) =>
                        prevFriends.filter(
                          (prevFriend) => prevFriend.id !== friend.id,
                        ),
                      )
                    }}
                    onRequest={() => {}}
                  />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </AppScreen>
  )
}

export default FriendRequestPage
