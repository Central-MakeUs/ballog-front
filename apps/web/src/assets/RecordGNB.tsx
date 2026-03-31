import type { SVGProps } from 'react'

const ACTIVE_CLASS_TOKENS = [
  'text-brand-neutral-white',
  'light:text-brand-neutral-80',
] as const

const RecordGNB = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  const classTokens = className?.split(/\s+/) ?? []
  const detailColor = ACTIVE_CLASS_TOKENS.some((token) =>
    classTokens.includes(token),
  )
    ? '#333333'
    : 'var(--color-brand-neutral-40)'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 24"
      className={className}
      {...props}
    >
      <path
        d="M12.2746 4.77827V0.391602H4.22461C2.28794 0.391602 0.724609 1.95494 0.724609 3.8916V20.1083C0.724609 22.0449 2.28794 23.6083 4.22461 23.6083H15.7746C17.7113 23.6083 19.2746 22.0449 19.2746 20.1083V6.71494H14.2229C13.1496 6.71494 12.2746 5.83994 12.2746 4.7666V4.77827Z"
        fill="currentColor"
      />
      <path
        d="M18.2604 5.80494L13.8621 1.8266L12.2754 0.391602V4.77827C12.2754 5.8516 13.1504 6.7266 14.2237 6.7266H19.2754L18.2604 5.80494Z"
        fill={detailColor}
      />
      <path
        d="M14.397 12.3382H5.61198C4.97031 12.3382 4.44531 11.8132 4.44531 11.1715C4.44531 10.5299 4.97031 10.0049 5.61198 10.0049H14.397C15.0386 10.0049 15.5636 10.5299 15.5636 11.1715C15.5636 11.8132 15.0386 12.3382 14.397 12.3382Z"
        fill={detailColor}
      />
      <path
        d="M14.397 16.9701H5.61198C4.97031 16.9701 4.44531 16.4451 4.44531 15.8034C4.44531 15.1617 4.97031 14.6367 5.61198 14.6367H14.397C15.0386 14.6367 15.5636 15.1617 15.5636 15.8034C15.5636 16.4451 15.0386 16.9701 14.397 16.9701Z"
        fill={detailColor}
      />
    </svg>
  )
}

export default RecordGNB
