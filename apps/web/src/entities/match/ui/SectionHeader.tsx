interface SectionHeaderProps {
  title: string[]
}

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 pt-10 px-4 w-full">
      <div className="text-center">
        <p className="body-lg-bold text-white mb-0 whitespace-pre-line">
          {title.join('\n')}
        </p>
      </div>
    </div>
  )
}
