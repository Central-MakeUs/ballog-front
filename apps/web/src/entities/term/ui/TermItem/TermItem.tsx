import RightArrow from '@/assets/RightArrow'
import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox'
import { type TermType } from '@/entities/term/model/term.type'

interface TermItemProps {
  id: TermType
  text: string
  required: boolean
  checked: boolean
  onToggle: (id: TermType) => void
  onDetailClicks: (id: TermType) => void
}

export const TermItem = ({
  id,
  text,
  checked,
  onToggle,
  onDetailClicks,
}: TermItemProps) => {
  return (
    <div className="flex items-center justify-between w-full h-16 py-4 pl-4">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-2">
          <Checkbox checked={checked} onToggle={() => onToggle(id)} />
          <span className="body-sm-medium text-usage-text-default">{text}</span>
        </div>
        <Button
          variant="secondary"
          buttonType="naked"
          size="icon"
          className="relative p-0 overflow-clip shrink-0 size-6"
          onClick={() => onDetailClicks(id)}
          aria-label="상세보기"
        >
          <RightArrow className="size-6" />
        </Button>
      </div>
    </div>
  )
}
