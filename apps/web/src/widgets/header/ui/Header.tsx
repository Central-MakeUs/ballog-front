import React from 'react'

interface HeaderProps {
  title?: string | React.ReactNode
  titlePosition?: 'center' | 'left'
  left?: React.ReactNode
  right?: React.ReactNode
  logo?: React.ReactNode
}

export const Header = ({
  title,
  titlePosition = 'center', // 타이틀 위치 기본값 중앙
  left,
  right,
  logo,
}: HeaderProps) => {
  return (
    <header className="h-12 flex items-center border-none px-4 relative bg-transparent">
      {left && <div className="absolute left-4">{left}</div>}

      {logo ? (
        <div className="mx-auto flex justify-center items-center">{logo}</div>
      ) : (
        <div
          className={`mx-auto text-base font-semibold ${
            titlePosition === 'left' ? 'ml-0 mr-auto' : ''
          }`}
        >
          {title}
        </div>
      )}

      {right && <div className="absolute right-4">{right}</div>}
    </header>
  )
}
