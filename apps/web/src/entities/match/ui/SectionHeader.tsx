interface SectionHeaderProps {
  title: string[]
  subtitle: string | string[]
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 pt-8 px-4 w-full">
      <div className="text-center">
        {title.map((line, index) => (
          <p key={index} className="body-lg-bold text-white mb-0">
            {line}
          </p>
        ))}
      </div>

      <div className="text-center">
        {Array.isArray(subtitle) ? (
          subtitle.map((line, index) => (
            <p key={index} className="body-sm-light text-gray-300 mb-0">
              {line}
            </p>
          ))
        ) : (
          <p className="body-sm-light text-gray-300">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
