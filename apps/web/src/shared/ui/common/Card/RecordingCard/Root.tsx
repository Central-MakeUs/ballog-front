import type { ReactNode } from 'react'

interface RootProps {
  children: ReactNode
}

export const Root = ({ children }: RootProps) => {
  return (
    <div className="flex items-center gap-4 p-4 w-[328px] flex-shrink-0 rounded-xlarge bg-usage-background-subtle">
      {children}
    </div>
  )
}