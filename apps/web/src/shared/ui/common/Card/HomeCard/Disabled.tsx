// TODO: 아이콘 가져온 뒤에 css 맞추기. 지금은 임시로 샘플 넣어놓음

import SampleImage from '@/assets/whiteBallogLogo.svg?react'
import type { ReactNode } from 'react'
import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

interface DisabledProps extends ComponentProps<'div'> {
  children?: ReactNode
}

export const Disabled = ({ children, className, ...rest }: DisabledProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center w-full max-w-[200px] h-full max-h-[324px] overflow-hidden rounded-medium',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col items-center justify-center w-full h-full py-12 px-4 bg-usage-background-subtle">
        <SampleImage />
        {children}
      </div>
    </div>
  )
}
