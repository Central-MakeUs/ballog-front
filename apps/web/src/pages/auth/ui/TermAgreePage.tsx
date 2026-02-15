import { AppScreen } from '@stackflow/plugin-basic-ui'

import { BackArrow } from '@/assets/BackArrow'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { TermAgreementForm } from '@/pages/auth/ui/TermAgreementForm'
import { useFlow } from '@/app/routes/stackflow'
import { type TermItemData } from '@/entities/term/model/term.type'
import { TERM_ID } from '@/entities/term/constants/termId'
import BallogAppBar from '@/assets/BallogAppBar'

// terms에서 id에 따라 checked 여부를 추출하여 반환
const extractTermData = (terms: TermItemData[]) => {
  const termMap = new Map(terms.map((term) => [term.id, term.checked]))

  return {
    serviceAgree: termMap.get(TERM_ID.SERVICE) ?? false,
    marketingAgree: termMap.get(TERM_ID.MARKETING) ?? false,
    privacyAgree: termMap.get(TERM_ID.PRIVACY) ?? false,
  }
}

const TermAgreePage = () => {
  const { push } = useFlow()

  const handleNext = ({ terms }: { terms: TermItemData[] }) => {
    push('TeamSelect', {
      ...extractTermData(terms),
    })
  }

  return (
    <AppScreen
      appBar={{
        title: <BallogAppBar />,
        height: '48px',
        backButton: {
          renderIcon: () => (
            <BackArrow className="text-brand-neutral-70 dark:text-brand-neutral-white" />
          ),
        },
      }}
      preventSwipeBack={true}
    >
      <AppLayout>
        <TermAgreementForm onSubmit={handleNext} />
      </AppLayout>
    </AppScreen>
  )
}

export default TermAgreePage
