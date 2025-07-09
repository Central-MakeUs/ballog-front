import { TEAMS } from '@/shared/constants/teams'

interface TeamSelectButtonProps {
  label: (typeof TEAMS)[keyof typeof TEAMS]
  selected?: boolean
  onClick: () => void
}

export const TeamSelectButton = ({
  label,
  selected = false,
  onClick,
}: TeamSelectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-lg ${
        selected ? 'bg-cyan-400 text-black' : 'bg-gray-700 text-white'
      }`}
    >
      {label}
    </button>
  )
}
