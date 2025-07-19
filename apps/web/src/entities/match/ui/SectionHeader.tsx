interface SectionHeaderProps {
  title: string[]
  subtitle: string | string[]
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 pt-8 px-4 w-full">
      <div className="text-center">
        <p className="body-lg-bold text-white mb-0 whitespace-pre-line">
          {title.join('\n')}
        </p>
      </div>

      <div className="text-center">
        <p className="body-sm-light text-gray-300 mb-0 whitespace-pre-line">
          {Array.isArray(subtitle) ? subtitle.join('\n') : subtitle}
        </p>
      </div>
    </div>
  )
}
