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
            서비스 이용약관
          </span>
        ),
        backButton: {
          renderIcon: () => <BackArrow className="dark:text-brand-neutral-white light:text-brand-neutral-70" />,
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
