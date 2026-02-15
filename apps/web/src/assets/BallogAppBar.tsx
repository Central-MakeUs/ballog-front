import { ColoredBallogLogo, WhiteBallogLogo } from '@ballog/asset/icons'

const BallogAppBar = () => {
  return (
    <>
      <WhiteBallogLogo className="h-16 w-auto hidden dark:block" />
      <ColoredBallogLogo className="h-16 w-auto block dark:hidden" />
    </>
  )
}

export default BallogAppBar
