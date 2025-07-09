import { useState } from 'react'
import { TeamSelectButton } from '@/entities/auth/ui'
import { TEAMS, type TeamKey } from '@/shared/constants/teams'
import { cn } from '@/shared/lib/utils'

type TeamSelectionFormProps = {
  onSubmit: (team: TeamKey) => void
}

export const TeamSelectionForm = ({ onSubmit }: TeamSelectionFormProps) => {
  const [selectedTeam, setSelectedTeam] = useState<TeamKey | null>(null)

  const handleSelect = (team: TeamKey) => {
    setSelectedTeam(team)
  }

  const handleSubmit = () => {
    if (!selectedTeam) return
    onSubmit(selectedTeam)
  }

  return (
    <div className="flex flex-col items-center w-full h-full px-4">
      <div className="flex flex-col items-center w-full gap-8">
        <p className="body-lg-bold mt-8">응원하는 팀을 선택해주세요</p>

        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          {Object.entries(TEAMS).map(([key, value]) => (
            <TeamSelectButton
              key={key}
              label={value}
              selected={selectedTeam === key}
              onClick={() => handleSelect(key as TeamKey)}
            />
          ))}
        </div>
      </div>

      <div className="flex-grow" />

      <button
        disabled={!selectedTeam}
        onClick={handleSubmit}
        className={cn(
          'w-full py-3 rounded-lg sticky bottom-10',
          selectedTeam ? 'bg-cyan-400 text-black' : 'bg-gray-600 text-gray-400',
        )}
      >
        시작하기
      </button>
    </div>
  )
}
