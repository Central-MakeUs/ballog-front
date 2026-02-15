import { LoginPageIcon } from '@ballog/asset/icons'

// Entities에는 순수 데이터 표시
export const Banner = () => {
  return (
    <div className="flex flex-col items-center">
      <LoginPageIcon aria-label="ballog icon" className="w-20 h-20 mb-4" />
      <p className="text-center text-lg body-md-bold text-usage-text-default">
        나만의 경기 순간 기록하기
      </p>
    </div>
  )
}
