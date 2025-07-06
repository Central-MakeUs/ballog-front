export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col items-center w-full h-full bg-usage-background-default">
        {children}
      </div>
    </>
  )
}
