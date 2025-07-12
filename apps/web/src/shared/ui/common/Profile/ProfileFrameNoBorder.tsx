export const ProfileFrameNoBorder = ({ imgSrc }: { imgSrc: string }) => (
  <svg
    width="84"
    height="84"
    viewBox="0 0 84 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="paint0_linear_10304_721"
        x1="42"
        y1="0"
        x2="42"
        y2="84"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C3F0EC" />
        <stop offset="1" stopColor="#17A093" />
      </linearGradient>

      <mask id="image-mask">
        <rect width="84" height="84" fill="white" />
        <circle cx="70" cy="62" r="16" fill="black" />
      </mask>
      {/* 이미지 클립 패스 - 내부 원형 영역 */}
      <clipPath id="image-clip">
        <circle cx="42" cy="42" r="36" />
      </clipPath>

      <clipPath id="clip0_10304_721">
        <rect width="84" height="84" fill="white" />
      </clipPath>
    </defs>

    <g clipPath="url(#clip0_10304_721)">
      {/* 배경 이미지 */}
      <image
        href={imgSrc}
        x="6"
        y="6"
        width="72"
        height="72"
        clipPath="url(#image-clip)"
        preserveAspectRatio="xMidYMid slice"
        mask="url(#image-mask)"
      />

      {/* + 버튼 */}
      <path
        d="M70 74C76.6274 74 82 68.6274 82 62C82 55.3726 76.6274 50 70 50C63.3726 50 58 55.3726 58 62C58 68.6274 63.3726 74 70 74Z"
        fill="#333333"
      />
      <path
        d="M76 61H71V56C71 55.45 70.55 55 70 55C69.45 55 69 55.45 69 56V61H64C63.45 61 63 61.45 63 62C63 62.55 63.45 63 64 63H69V68C69 68.55 69.45 69 70 69C70.55 69 71 68.55 71 68V63H76C76.55 63 77 62.55 77 62C77 61.45 76.55 61 76 61Z"
        fill="white"
      />
    </g>
  </svg>
)
