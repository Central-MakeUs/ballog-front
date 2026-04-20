import { EmptyState, NoEmotionCharacterWithNoArm } from '@ballog/asset/icons'

import {
  useAcceptFriendMutation,
  useReceivedRequestsQuery,
  useRejectFriendMutation,
} from '@/entities/friend'
import type { FriendRequestItem } from '@/entities/friend/model/friend.type'

const ReceivedRequestItem = ({ request }: { request: FriendRequestItem }) => {
  const { mutate: acceptFriend, isPending: isAccepting } =
    useAcceptFriendMutation()
  const { mutate: rejectFriend, isPending: isRejecting } =
    useRejectFriendMutation()

  const disabled = isAccepting || isRejecting

  return (
    <div className="flex items-center w-full gap-4 py-2.5">
      <div className="shrink-0 size-11">
        <NoEmotionCharacterWithNoArm className="size-11" />
      </div>
      <div className="flex flex-col items-start flex-1 min-w-0">
        <p className="body-md-bold text-usage-text-default">
          {request.nickname}
        </p>
        <p className="truncate body-md-medium text-usage-text-subtle">
          응원팀 미정
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          disabled={disabled}
          onClick={() => rejectFriend({ requesterId: request.requesterId })}
          className="h-8 px-3 rounded-large body-sm-medium light:bg-brand-secondary-default text-brand-neutral-70 disabled:opacity-60"
        >
          삭제
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => acceptFriend({ requesterId: request.requesterId })}
          className="h-8 px-3 rounded-large body-sm-medium bg-brand-primary-default text-brand-neutral-white disabled:opacity-60"
        >
          확인
        </button>
      </div>
    </div>
  )
}

export const ReceivedRequestList = () => {
  const { data } = useReceivedRequestsQuery()
  const requests = data?.data ?? []

  if (requests.length === 0) {
    return (
      <section
        className="flex flex-col items-center justify-center flex-1 w-full gap-4 px-4"
        aria-label="받은 친구 요청"
      >
        <div className="flex flex-col items-center justify-center w-full pt-2 text-center">
          <p className="body-lg-bold text-usage-text-default">
            친구 요청이 아직 없습니다.
          </p>
        </div>
        <div className="flex items-center justify-center w-full py-2">
          <EmptyState className="w-[83px] h-[114px]" />
        </div>
      </section>
    )
  }

  return (
    <section
      className="flex flex-col w-full gap-3 mb-8"
      aria-label="받은 친구 요청"
    >
      {requests.map((request) => (
        <ReceivedRequestItem key={request.requesterId} request={request} />
      ))}
    </section>
  )
}

export default ReceivedRequestList
