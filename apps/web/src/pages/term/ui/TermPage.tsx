import { AppScreen } from '@stackflow/plugin-basic-ui'

import { BackArrow } from '@/assets/BackArrow'
import { AppLayout } from '@/shared/ui/layout/AppLayout'
import { TermContent, type TermType } from '@/entities/term/ui/TermContent'

const TermPage = ({ params }: { params: { type: TermType } }) => {
  return (
    <AppScreen
      appBar={{
        title: (
          <span className="text-usage-text-default body-md-bold">
            기록 상세보기
          </span>
        ),
        backButton: {
          renderIcon: () => <BackArrow />,
        },
      }}
    >
      <AppLayout>
        <TermContent type={params.type} />
      </AppLayout>
    </AppScreen>
  )
}

export default TermPage
