import { Checkbox } from '@/shared/ui/common/Checkbox'
import { TermItem } from '@/entities/term/ui/TermItem'
import {
  type TermItemData,
  type TermType,
} from '@/entities/term/model/term.type'

interface TermCheckListProps {
  terms: TermItemData[]
  allChecked: boolean
  onAllToggle: (checked: boolean) => void
  onTermToggle: (id: TermType) => void
  onDetailClick?: (id: TermType) => void
}

export const TermCheckList = ({
  terms,
  allChecked,
  onAllToggle,
  onTermToggle,
  onDetailClick,
}: TermCheckListProps) => {
  return (
    <div className="flex flex-col w-full">
      {/* 전체 동의 체크박스 */}
      <div className="flex items-center h-16 pl-2 relative border-b border-brand-neutral-90">
        <div className="flex items-center gap-4">
          <Checkbox
            checked={allChecked}
            onToggle={() => onAllToggle(!allChecked)}
          />
          <span className="body-sm-medium text-usage-text-default">
            약관 전체 동의
          </span>
        </div>
      </div>

      {/* 개별 약관 체크박스들 */}
      <div className="flex flex-col w-full">
        {terms.map((term) => (
          <TermItem
            key={term.id}
            id={term.id}
            text={term.text}
            required={term.required}
            checked={term.checked}
            onToggle={onTermToggle}
            onDetailClicks={onDetailClick || (() => {})}
          />
        ))}
      </div>
    </div>
  )
}
