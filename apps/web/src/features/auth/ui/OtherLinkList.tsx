import { List } from '@/shared/ui/common/List/List'

export const OtherLinkList = () => {
  return (
    <div className="space-y-4 mb-6">
      <p className="body-sm-bold text-brand-neutral-white">기타 설정</p>
      <List type="arrow">볼로그 인스타그램</List>
      <List type="arrow">문의하기</List>
      <List type="arrow">개인정보 처리방침</List>
      <List type="arrow">서비스 이용약관</List>
    </div>
  )
}
