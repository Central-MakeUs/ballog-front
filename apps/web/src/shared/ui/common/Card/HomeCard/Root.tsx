interface HomeCardRootProps {
  children: React.ReactNode
}

export const Root = ({ children }: HomeCardRootProps) => {
  return (
    <div className="flex flex-col items-center w-full max-w-[200px] pb-2 overflow-hidden rounded-medium">
      {children}
    </div>
  )
}
