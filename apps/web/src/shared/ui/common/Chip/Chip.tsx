import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'
import type { ComponentProps } from 'react'

const chipVarients = cva(
  'inline-flex h-8 px-3 justify-center items-center shrink-0 rounded-large caption-md-medium',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        red: '',
        green: '',
      },
      state: {
        default: '',
        subtle: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      state: 'default',
    },
    compoundVariants: [
      // primary
      {
        variant: 'primary',
        state: 'default',
        class: cn('bg-brand-primary-default text-brand-neutral-white'),
      },
      {
        variant: 'primary',
        state: 'subtle',
        class: cn('bg-brand-primary-subtle text-brand-primary-default'),
      },

      // secondary
      {
        variant: 'secondary',
        state: 'default',
        class: cn('bg-brand-secondary-default text-brand-neutral-white'),
      },
      {
        variant: 'secondary',
        state: 'subtle',
        class: cn('bg-brand-secondary-subtle text--brand-neutral-70'),
      },

      // red
      {
        variant: 'red',
        state: 'default',
        class: cn('bg-brand-red-default text-brand-neutral-white'),
      },
      {
        variant: 'red',
        state: 'subtle',
        class: cn('bg-brand-red-red-subtle text-brand-red-default'),
      },

      // green
      {
        variant: 'green',
        state: 'default',
        class: cn('bg-brand-green-default text-brand-neutral-white'),
      },
      {
        variant: 'green',
        state: 'subtle',
        class: cn('bg-brand-green-subtle text-brand-green-default'),
      },
    ],
  },
)

interface ChipProps
  extends ComponentProps<'div'>,
    VariantProps<typeof chipVarients> {
  children?: React.ReactNode
}

export const Chip = ({
  variant,
  state,
  children,
  className,
  ...rest
}: ChipProps) => {
  return (
    <div className={cn(chipVarients({ variant, state }), className)} {...rest}>
      {children}
    </div>
  )
}
