import React from 'react'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col items-center w-full pb-25 bg-usage-background-default">
        {children}
      </div>
    </>
  )
}
