import { AddUser, NoEmotionCharacterWithNoArm } from '@ballog/asset/icons'

import { useFlow } from '@/app/routes/stackflow'
import { useReceivedRequestsQuery } from '@/entities/friend'
import RightArrow from '@/assets/RightArrow'

export const FriendRequestNotice = () => {
  const { push } = useFlow()
  const { data } = useReceivedRequestsQuery()
  const requests = data?.data ?? []
  const count = requests.length

  if (count === 0) {
    return (
      <div className="flex items-center w-full gap-4 py-2.5">
        <div className="flex items-center justify-center shrink-0 size-11 rounded-full bg-brand-neutral-20">
          <AddUser className="size-6 text-usage-text-default" />
        </div>
        <div className="flex flex-col items-start flex-1 min-w-0">
          <p className="body-md-bold text-usage-text-default">친구 요청</p>
          <p className="body-md-medium text-usage-text-default">
            친구 요청이 아직 없습니다.
          </p>
        </div>
      </div>
    )
  }

  const firstNickname = requests[0].nickname
  const subtitle =
    count === 1
      ? `${firstNickname}님`
      : `${firstNickname}님 외 ${count - 1}명`

  return (
    <button
      type="button"
      aria-label="친구 요청 목록 보기"
      className="flex items-center w-full gap-4 py-2.5"
      onClick={() => push('FriendRequest', {})}
    >
      {count === 1 ? (
        <div className="shrink-0 size-11">
          <NoEmotionCharacterWithNoArm className="size-11" />
        </div>
      ) : (
        <div className="relative shrink-0 w-[57px] size-11">
          <NoEmotionCharacterWithNoArm className="absolute left-0 top-0 size-11" />
          <NoEmotionCharacterWithNoArm className="absolute left-[13px] top-0 size-11" />
        </div>
      )}
      <div className="flex flex-col items-start flex-1 min-w-0">
        <p className="body-md-bold text-usage-text-default">친구 요청</p>
        <p className="truncate body-md-medium text-usage-text-default">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <span className="flex items-center justify-center min-w-6 px-1 rounded-full bg-brand-primary-default text-brand-neutral-white body-md-bold">
          {count}
        </span>
        <RightArrow className="size-6 text-usage-text-default" />
      </div>
    </button>
  )
}

export default FriendRequestNotice
