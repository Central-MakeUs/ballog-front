import { useFlow } from '@/shared/lib/stackflow'
import { useTermAgreement } from '@/pages/auth/hooks/useTermAgreement'
import { TermCheckList } from '@/entities/term/ui/TermCheckList'
import { Button } from '@/shared/ui/common'
import {
  type TermItemData,
  type TermType,
} from '@/entities/term/model/term.type'
import { TERM_ID, TERM_TEXT } from '@/entities/term/constants/termId'

interface TermAgreementFormProps {
  onSubmit: ({ terms }: { terms: TermItemData[] }) => void
}

const TERM_AGREEMENT_DATA: TermItemData[] = [
  {
    id: TERM_ID.PRIVACY,
    text: TERM_TEXT.PRIVACY,
    required: true,
    checked: false,
  },
  {
    id: TERM_ID.SERVICE,
    text: TERM_TEXT.SERVICE,
    required: true,
    checked: false,
  },
  {
    id: TERM_ID.MARKETING,
    text: TERM_TEXT.MARKETING,
    required: false,
    checked: false,
  },
]

export const TermAgreementForm = ({ onSubmit }: TermAgreementFormProps) => {
  const { push } = useFlow()
  const { terms, allChecked, isNextEnabled, toggleTerm, toggleAll } =
    useTermAgreement(TERM_AGREEMENT_DATA)

  const handleDetailClick = (id: TermType) => {
    push('Term', { type: id })
  }

  return (
    <div className="flex flex-col items-center justify-between w-full h-full px-4">
      <div className="flex flex-col items-center w-full gap-8">
        <p className="body-lg-bold mt-8">
          서비스 이용을 위해 약관에 동의해주세요
        </p>

        <div className="flex flex-col items-center w-full gap-2">
          <TermCheckList
            terms={terms}
            allChecked={allChecked}
            onAllToggle={toggleAll}
            onTermToggle={toggleTerm}
            onDetailClick={handleDetailClick}
          />
        </div>
      </div>

      <Button
        size="lg"
        variant="primary"
        onClick={() => onSubmit({ terms })}
        disabled={!isNextEnabled}
        className="fixed bottom-10 left-4 right-4"
      >
        완료
      </Button>
    </div>
  )
}
