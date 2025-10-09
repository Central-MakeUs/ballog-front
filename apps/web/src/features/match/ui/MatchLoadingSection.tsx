import { Loading } from '@/shared/ui/common'

export const MatchLoadingSection = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-screen pb-20">
      <div className="flex flex-1 items-center justify-center pb-20">
        <Loading text="오늘의 경기를 불러오는 중..." />
      </div>
    </div>
  )
}
