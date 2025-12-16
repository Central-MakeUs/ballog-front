import WhiteBallogLogo from '@/assets/whiteBallogLogo.svg?react'
import ColoredBallogLogo from '@/assets/coloredBallogLogo.svg?react'

const BallogAppBarTitle = () => {
  return (
    <>
      <WhiteBallogLogo className="hidden dark:block" />
      <ColoredBallogLogo className="block dark:hidden" />
    </>
  )
}

export default BallogAppBarTitle
