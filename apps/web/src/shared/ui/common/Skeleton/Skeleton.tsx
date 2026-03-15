import { cn } from '@/shared/lib/classnames'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={cn('animate-pulse rounded-md bg-brand-neutral-20', className)}
  />
)
