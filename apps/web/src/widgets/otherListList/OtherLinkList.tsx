import { List } from '@/shared/ui/common/List/List'
import { BallogInstagramList } from '@/features/mypage/ui/BallogInstagramList'

export const OtherLinkList = () => {
  return (
    <div className="space-y-4 mb-6">
      <p className="body-sm-bold text-brand-neutral-white">기타 설정</p>
      <BallogInstagramList />
      <List type="arrow">문의하기</List>
      <List type="arrow">개인정보 처리방침</List>
      <List type="arrow">서비스 이용약관</List>
    </div>
  )
}
