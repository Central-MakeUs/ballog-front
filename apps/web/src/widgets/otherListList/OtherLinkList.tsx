import { List } from '@/shared/ui/common/List/List'
import { BallogInstagramList } from '@/features/mypage/ui/BallogInstagramList'
import { useFlow } from '@/app/routes/stackflow'
import { TERM_ID } from '@/entities/term/constants/termId'

export const OtherLinkList = () => {
  const { push } = useFlow()

  return (
    <div className="mb-6 space-y-4">
      <p className="body-sm-bold text-usage-text-default">기타 설정</p>
      <BallogInstagramList />
      <List
        type="arrow"
        onClick={() => push('Term', { type: TERM_ID.PRIVACY })}
      >
        개인정보 처리방침
      </List>
      <List
        type="arrow"
        onClick={() => push('Term', { type: TERM_ID.SERVICE })}
      >
        서비스 이용약관
      </List>
    </div>
  )
}
