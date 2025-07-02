import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg'
import { TeamSelectButton } from '@/entities/auth/ui'
import { Header } from '@/widget/header'
import { useState } from 'react'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useFlow } from '@/share/lib/stackflow'
import { teams } from '@/constants/teams'

const TeamSelectPage = () => {
  const { push } = useFlow()

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const handleSelect = (team: string) => {
    setSelectedTeam(team)
  }

  return (
    <AppScreen>
      <Header
        logo={<img src={WhiteBallogLogo} alt="ballog" className="h-6" />}
      />
      <div className="flex flex-col items-center min-h-screen bg-black text-white p-6">
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
          onClick={() => push('NickName', {})}
          className={`w-full max-w-xs py-3 rounded-lg ${
            selectedTeam
              ? 'bg-cyan-400 text-black'
              : 'bg-gray-600 text-gray-400'
          }`}
        >
          시작하기
        </button>
      </div>
    </AppScreen>
  )
}

export default TeamSelectPage
