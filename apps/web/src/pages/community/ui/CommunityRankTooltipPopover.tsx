import * as PopoverPrimitive from '@radix-ui/react-popover'
import { GrayInfoIcon } from '@ballog/asset/icons'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/common/popover'

export const CommunityRankTooltipPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="현재 순위 안내"
          className="inline-flex size-5 shrink-0 items-center justify-center"
        >
          <GrayInfoIcon className="size-5" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="center"
        sideOffset={8}
        className="z-[60] w-fit max-w-none border-0 bg-brand-neutral-80 px-4 py-4 shadow-md"
      >
        <PopoverPrimitive.Arrow
          className="fill-brand-neutral-80"
          width={16}
          height={8}
        />

        <p className="body-sm-bold whitespace-nowrap text-center text-brand-neutral-10">
          내 응원팀의 현재 순위를 보여줘요.
        </p>
      </PopoverContent>
    </Popover>
  )
}

export default CommunityRankTooltipPopover
