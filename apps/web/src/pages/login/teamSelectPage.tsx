import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg'
import { useState } from 'react'
import TeamSelectButton from '@/components/common/teamButton'
import Header from '@/components/common/Header'

const teams = [
  '두산 베어스',
  '롯데 자이언츠',
  '삼성 라이온즈',
  '키움 히어로즈',
  '한화 이글스',
  'KIA 타이거즈',
  'KT 위즈',
  'LG 트윈스',
  'NC 다이노스',
  '응원팀 없음',
]

const TeamSelectPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const handleSelect = (team: string) => {
    setSelectedTeam(team)
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-6">
      <Header
        logo={<img src={WhiteBallogLogo} alt="ballog" className="h-6" />}
      />

      <p className="text-lg font-semibold mb-6">응원하는 팀을 선택해주세요</p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
        {teams.map((team) => (
          <TeamSelectButton
            key={team}
            label={team}
            selected={selectedTeam === team}
            onClick={() => handleSelect(team)}
          />
        ))}
      </div>

      <button
        disabled={!selectedTeam}
        className={`w-full max-w-xs py-3 rounded-lg ${
          selectedTeam ? 'bg-cyan-400 text-black' : 'bg-gray-600 text-gray-400'
        }`}
      >
        시작하기
      </button>
    </div>
  )
}

export default TeamSelectPage
