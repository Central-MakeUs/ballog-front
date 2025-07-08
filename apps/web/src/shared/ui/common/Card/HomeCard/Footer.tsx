interface FooterProps {
  children: React.ReactNode
}

export const Footer = ({ children }: FooterProps) => {
  return <div className="pb-4">{children}</div>
}
