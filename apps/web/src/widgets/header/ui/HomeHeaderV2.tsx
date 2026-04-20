import BellIcon from '@/assets/BellIcon'
import { Chevron } from '@/assets/Chevron'
import { useFlow } from '@/app/routes/stackflow'

interface HomeHeaderV2Props {
  nickname: string
  onProfileClick: () => void
}

export const HomeHeaderV2 = ({
  nickname,
  onProfileClick,
}: HomeHeaderV2Props) => {
  const { push } = useFlow()

  return (
    <header className="flex items-center justify-between w-full pl-5 pr-2 bg-transparent h-14 shrink-0">
      <button
        type="button"
        className="flex items-center gap-0.5"
        onClick={onProfileClick}
      >
        <span className="body-md-medium text-brand-neutral-70">{nickname}님</span>
        <Chevron className="w-6 h-6 text-brand-neutral-70" />
      </button>

      <button
        type="button"
        className="flex items-center justify-center w-12 h-12"
        onClick={() => push('Alerm', {})}
      >
        <BellIcon className="text-brand-neutral-50" />
      </button>
    </header>
  )
}
