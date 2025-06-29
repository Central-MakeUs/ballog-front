import { useState } from 'react'
import Header from '@/components/common/Header'
import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg'

const NickNamePage = () => {
  const [nickname, setNickname] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }

  const handleSubmit = () => {
    if (nickname.trim()) {
      console.log('닉네임:', nickname)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-6">
      <Header
        logo={<img src={WhiteBallogLogo} alt="ballog" className="h-6" />}
      />

      <p className="text-lg font-semibold mb-6">닉네임을 입력해주세요.</p>

      <input
        type="text"
        value={nickname}
        onChange={handleChange}
        placeholder="닉네임"
        className="w-full max-w-xs py-3 px-4 rounded-lg bg-gray-700 text-white mb-4 placeholder-gray-400"
      />

      <p className="text-sm text-gray-400 mb-10">{'{닉네임 정책 어쩌고}'}</p>

      <button
        onClick={handleSubmit}
        disabled={!nickname.trim()}
        className={`w-full max-w-xs py-3 rounded-lg ${
          nickname.trim()
            ? 'bg-cyan-400 text-black'
            : 'bg-gray-600 text-gray-400'
        }`}
      >
        완료
      </button>
    </div>
  )
}

export default NickNamePage
