interface SectionHeaderProps {
  title: string[]
}

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col w-full gap-4 px-4 pt-10">
      <div className="text-center">
        <p className="mb-0 whitespace-pre-line body-lg-bold text-usage-text-default">
          {title.join('\n')}
        </p>
      </div>
    </div>
  )
}
