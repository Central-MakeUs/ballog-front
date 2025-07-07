import { Header } from '@/widgets/header'
import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg'
import { useState } from 'react'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useMutation } from '@tanstack/react-query'
// import { authPost } from '@/entities/auth/api'

const NickNamePage = () => {
  const { mutate: signup } = useMutation({
    // mutationFn: authPost.signup,
    onSuccess: (data) => {
      console.log(data)
    },
  })

  const [nickname, setNickname] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }

  const baseballTeam = '두산'

  return (
    <AppScreen>
      <Header
        logo={<img src={WhiteBallogLogo} alt="ballog" className="h-6" />}
      />
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
          onClick={() => {
            // signup({ nickname, baseballTeam })
          }}
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
    </AppScreen>
  )
}

export default NickNamePage
