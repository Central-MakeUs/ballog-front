export const ProfileFrameWithBorder = ({ imgSrc }: { imgSrc: string }) => (
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

      {/* 기존 프레임들 */}
      <path
        d="M42 82C19.91 82 2 64.09 2 42C2 19.91 19.91 2 42 2C64.09 2 82 19.91 82 42C82 44.91 81.67 47.75 81.08 50.48C81.67 51.05 82.21 51.66 82.71 52.32C83.55 49.02 84 45.56 84 42C84 18.8 65.2 0 42 0C18.8 0 0 18.8 0 42C0 65.2 18.8 84 42 84C50.47 84 58.35 81.48 64.95 77.17C64.17 76.91 63.42 76.59 62.7 76.22C56.66 79.88 49.58 82 42 82Z"
        fill="url(#paint0_linear_10304_721)"
      />
      <path
        d="M42 78C22.12 78 6 61.88 6 42C6 22.12 22.12 6 42 6C61.88 6 78 22.12 78 42C78 44 77.83 45.97 77.51 47.88C78.82 48.58 80.02 49.46 81.08 50.48C81.67 47.74 82 44.91 82 42C82 19.91 64.09 2 42 2C19.91 2 2 19.91 2 42C2 64.09 19.91 82 42 82C49.58 82 56.66 79.88 62.7 76.22C61.38 75.54 60.17 74.68 59.1 73.67C54.01 76.42 48.2 78 42.01 78H42Z"
        fill="#030303"
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
