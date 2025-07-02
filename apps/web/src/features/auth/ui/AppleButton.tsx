// features에는 비즈니스 로직 작성
export const AppleButton = () => {
  return (
    <button
      className="bg-gray-400 text-black rounded-lg py-3"
      onClick={() => {
        console.log('애플 로그인')
      }}
    >
      애플로 시작하기
    </button>
  )
}
