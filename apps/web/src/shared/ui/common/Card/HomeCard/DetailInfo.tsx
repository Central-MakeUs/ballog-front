interface DetailInfoProps {
  stadium: string
  dateTime: string
}

export const DetailInfo = ({ stadium, dateTime }: DetailInfoProps) => {
  return (
    <div className="w-full text-center pt-4 pb-4 bg-usage-background-inverses">
      <div className="mb-2 body-sm-medium">{stadium}</div>
      <div className="body-sm-light">{dateTime}</div>
    </div>
  )
}