import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()
  return (
    <Sonner
      data-testid="toast"
      theme={theme as ToasterProps['theme']}
      className="toaster group !bottom-30"
      duration={1500}
      toastOptions={{
        className:
          '!bg-usage-background-inverse !text-usage-text-inverse body-sm-medium',
      }}
      {...props}
    />
  )
}
export { Toaster }
