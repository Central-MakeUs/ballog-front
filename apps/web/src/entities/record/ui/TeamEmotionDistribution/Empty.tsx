import InfoIcon from '@/assets/InfoIcon'

export const Empty = () => {
  return (
    <div className="w-full flex px-6 py-8 items-center justify-center rounded-xl bg-usage-background-subtle">
      <div className="flex items-center text-brand-neutral-60 body-sm-light gap-2">
        <InfoIcon className="w-5 h-5" />
        경기 종료 후 최종 감정 분포가 표시됩니다.
      </div>
    </div>
  )
}
