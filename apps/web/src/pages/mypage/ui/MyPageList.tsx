import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/shared/lib/classnames'
import { useFlow } from '@stackflow/react/future'
import { List } from '@/shared/ui/common/List'

interface MyPageListProps extends ComponentProps<'div'> {
  className?: string
  children: ReactNode
  type: 'arrow' | 'switch'
  onClick?: () => void
}

export const MyPageList = ({
  children,
  className,
  type,
  ...rest
}: MyPageListProps) => {
  const { push } = useFlow()

  if (type === 'arrow') {
    return (
      <>
        <List.Root>
          <List.Text>{children}</List.Text>
          <List.Arrow />
        </List.Root>
      </>
    )
  } else if (type === 'switch') {
    return (
      <List.Root>
        <List.Text>{children}</List.Text>
        <List.SwitchItem />
      </List.Root>
    )
  }
}
