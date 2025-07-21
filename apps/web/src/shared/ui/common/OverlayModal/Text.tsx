import type { ComponentProps } from 'react'

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui/common/dialog'
import { cn } from '@/shared/lib/classnames'

interface TextProps extends ComponentProps<'div'> {
  heading: string
  body?: string
  isImageModal?: boolean
}

export const Text = ({
  heading,
  body,
  isImageModal,
  className,
  ...rest
}: TextProps) => {
  return (
    <DialogHeader>
      <div
        className={cn(
          'flex flex-col space-y-2 text-center items-center text-usage-text-inverse',
          isImageModal && 'mb-8',
          className,
        )}
        {...rest}
      >
        <DialogTitle className="body-lg-bold">{heading}</DialogTitle>
        {body && (
          <DialogDescription className="body-sm-medium">
            {body}
          </DialogDescription>
        )}
      </div>
    </DialogHeader>
  )
}
