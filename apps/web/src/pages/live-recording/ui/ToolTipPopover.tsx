import * as PopoverPrimitive from '@radix-ui/react-popover'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from '@/shared/ui/common/popover'
import InfoIcon from '@/assets/InfoIcon'
import ToolTipImage from '@/assets/toolTipImage.png'

export function ToolTipPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="감정 기록 도움말"
          className="inline-flex items-center justify-center w-5 h-5 ml-1"
        >
          <InfoIcon className="w-5 h-5 text-usage-text-subtle light:text-brand-neutral-70" />
        </button>
      </PopoverTrigger>

      <PopoverAnchor asChild>
        <div className="absolute w-0 h-0 -translate-x-1/2 pointer-events-none left-1/2 top-6" />
      </PopoverAnchor>

      <PopoverContent
        side="bottom"
        align="center"
        className="
            flex flex-col w-62.5 rounded-md bg-brand-neutral-80 light:bg-brand-neutral-70 relative
            text-brand-neutral-10 border-0 gap-4 py-6 px-4
         "
      >
        <PopoverPrimitive.Arrow
          className="fill-brand-neutral-80 drop-shadow-[0_-2px_6px_rgba(0,0,0,0.25)] translate-x-[-79px]"
          width={16}
          height={16}
        />
        <p className="text-center body-sm-bold ">
          지금 이 순간 경기를 관람하며 <br /> 드는 감정을 눌러보세요.
        </p>

        <div className="flex justify-center">
          <img src={ToolTipImage} className="w-full" />
        </div>

        <p className="text-center body-sm-light">
          한 감정을 여러 번 누를 수도,
          <br />
          다른 감정을 표현할 수도 있어요.
        </p>
      </PopoverContent>
    </Popover>
  )
}
