import LoginPageIcon from '@/assets/loginPageIcon.svg'

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <div className="flex flex-col items-center mb-20">
        <img src={LoginPageIcon} alt="ballog icon" className="w-20 h-20 mb-4" />
        <p className="text-center text-lg font-semibold">
          오늘의 경기 선택하고 <br /> 감정 기록하기
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button className="bg-gray-700 text-white rounded-lg py-3">
          카카오로 시작하기
        </button>
        <button className="bg-gray-400 text-black rounded-lg py-3">
          애플로 시작하기
        </button>
      </div>
    </div>
  )
}

export default LoginPage
