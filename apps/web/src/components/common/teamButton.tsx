interface TeamSelectButtonProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
}

const TeamSelectButton = ({ label, selected = false, onClick }: TeamSelectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 rounded-lg ${
        selected ? 'bg-cyan-400 text-black' : 'bg-gray-700 text-white'
      }`}
    >
      {label}
    </button>
  );
};

export default TeamSelectButton;
