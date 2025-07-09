import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md body-md-medium transition-all disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
      },
      size: {
        sm: 'h-8 rounded-large p-3 body-sm-medium has-[>svg]:px-2.5',
        default: 'h-10 rounded-large p-3 body-md-medium has-[>svg]:px-3',
        lg: 'h-12 rounded-large px-4 py-3 body-md-medium has-[>svg]:px-4',
        icon: 'p-3',
      },
      buttonType: {
        filled: '',
        outline: 'border bg-transparent',
        naked: 'border-none bg-transparent shadow-none',
      },
      state: {
        subtle: '',
        default: '',
        hover: '',
        pressed: '',
        disabled: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      buttonType: 'filled',
      state: 'default',
    },
    compoundVariants: [
      // Primary Filled
      {
        variant: 'primary',
        buttonType: 'filled',
        class: cn(
          'bg-brand-primary-default text-brand-primary-white',
          'hover:bg-brand-primary-hover hover:text-brand-primary-white',
          'active:bg-brand-primary-pressed active:text-brand-primary-white',
          'disabled:bg-brand-primary-disabled disabled:text-brand-primary-white',
        ),
      },
      // Secondary Filled
      {
        variant: 'secondary',
        buttonType: 'filled',
        class: cn(
          'bg-brand-secondary-default text-brand-secondary-white',
          'hover:bg-brand-secondary-hover hover:text-brand-secondary-white',
          'active:bg-brand-secondary-pressed active:text-brand-secondary-white',
          'disabled:bg-brand-secondary-disabled disabled:text-brand-secondary-white',
        ),
      },
      // Primary Outline
      {
        variant: 'primary',
        buttonType: 'outline',
        class: cn(
          'border-brand-primary-default text-brand-primary-default',
          'hover:text-brand-primary-hover hover:border-brand-primary-hover',
          'active:text-brand-primary-pressed active:border-brand-primary-pressed',
          'disabled:text-brand-primary-disabled disabled:border-brand-primary-disabled',
        ),
      },
      // Secondary Outline
      {
        variant: 'secondary',
        buttonType: 'outline',
        class: cn(
          'border-brand-secondary-default text-brand-secondary-default',
          'hover:text-brand-secondary-hover hover:border-brand-secondary-hover',
          'active:text-brand-secondary-pressed active:border-brand-secondary-pressed',
          'disabled:text-brand-secondary-disabled disabled:border-brand-secondary-disabled',
        ),
      },
      // Primary Naked
      {
        variant: 'primary',
        buttonType: 'naked',
        class: cn(
          'text-brand-primary-default',
          'hover:text-brand-primary-hover hover:border-brand-primary-hover',
          'active:text-brand-primary-pressed active:border-brand-primary-pressed',
          'disabled:text-brand-primary-disabled disabled:border-brand-primary-disabled',
        ),
      },
      // Secondary Naked
      {
        variant: 'secondary',
        buttonType: 'naked',
        class: cn(
          'text-brand-secondary-default',
          'hover:text-brand-secondary-hover hover:border-brand-secondary-hover',
          'active:text-brand-secondary-pressed active:border-brand-secondary-pressed',
          'disabled:text-brand-secondary-disabled disabled:border-brand-secondary-disabled',
        ),
      },

      {
        variant: 'primary',
        state: 'hover',
        buttonType: 'filled',
        class: cn('bg-brand-primary-subtle text-brand-primary-white'),
      },
      {
        variant: 'secondary',
        state: 'hover',
        buttonType: 'filled',
        class: cn('bg-brand-secondary-subtle text-brand-secondary-white'),
      },
      {
        variant: 'primary',
        buttonType: ['outline', 'naked'],
        state: 'hover',
        class: cn('border-brand-primary-hover text-brand-primary-hover'),
      },
      {
        variant: 'secondary',
        buttonType: ['outline', 'naked'],
        state: 'hover',
        class: cn('border-brand-secondary-hover text-brand-secondary-hover'),
      },
      // disabled
      {
        variant: 'primary',
        state: 'disabled',
        buttonType: 'filled',
        class: cn('bg-brand-primary-disabled text-brand-primary-white'),
      },
      {
        variant: 'secondary',
        state: 'disabled',
        buttonType: 'filled',
        class: cn('bg-brand-secondary-disabled text-brand-secondary-white'),
      },
      {
        variant: 'primary',
        buttonType: ['outline', 'naked'],
        state: 'disabled',
        class: cn('border-brand-primary-disabled text-brand-primary-disabled'),
      },
      {
        variant: 'secondary',
        buttonType: ['outline', 'naked'],
        state: 'disabled',
        class: cn(
          'border-brand-secondary-disabled text-brand-secondary-disabled',
        ),
      },
      //pressed
      {
        variant: 'primary',
        state: 'pressed',
        buttonType: 'filled',
        class: cn('bg-brand-primary-pressed text-brand-primary-white'),
      },
      {
        variant: 'secondary',
        state: 'pressed',
        buttonType: 'filled',
        class: cn('bg-brand-secondary-pressed text-brand-secondary-white'),
      },
      {
        variant: 'primary',
        buttonType: ['outline', 'naked'],
        state: 'pressed',
        class: cn('border-brand-primary-pressed text-brand-primary-pressed'),
      },
      {
        variant: 'secondary',
        buttonType: ['outline', 'naked'],
        state: 'pressed',
        class: cn(
          'border-brand-secondary-pressed text-brand-secondary-pressed',
        ),
      },
      //subtle
      {
        variant: 'primary',
        state: 'subtle',
        buttonType: 'filled',
        class: cn('bg-brand-primary-subtle text-brand-primary-default'),
      },
      {
        variant: 'secondary',
        state: 'subtle',
        buttonType: 'filled',
        class: cn('bg-brand-secondary-subtle text-brand-secondary-default'),
      },
      {
        variant: 'primary',
        buttonType: ['outline', 'naked'],
        state: 'subtle',
        class: cn('border-brand-primary-subtle text-brand-primary-subtle'),
      },
      {
        variant: 'secondary',
        buttonType: ['outline', 'naked'],
        state: 'subtle',
        class: cn('border-brand-secondary-subtle text-brand-secondary-subtle'),
      },
    ],
  },
)

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = ({
  className,
  variant,
  size,
  buttonType,
  asChild = false,
  leftIcon,
  rightIcon,
  children,
  state,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          buttonType,
          state,
          className,
        }),
      )}
      {...props}
    >
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </Comp>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
