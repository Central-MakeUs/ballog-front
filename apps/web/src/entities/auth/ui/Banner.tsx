import LoginPageIcon from '@/assets/loginPageIcon.svg'

// Entities에는 순수 데이터 표시
export const Banner = () => {
  return (
    <div className="flex flex-col items-center mb-20">
      <img src={LoginPageIcon} alt="ballog icon" className="w-20 h-20 mb-4" />
      <p className="text-center text-lg font-semibold">
        오늘의 경기 선택하고 <br /> 감정 기록하기
      </p>
    </div>
  )
}
