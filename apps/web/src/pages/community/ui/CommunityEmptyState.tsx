const emptyShadowImage =
  'https://www.figma.com/api/mcp/asset/5b7df411-1654-4f45-9934-64d6838ade52'
const emptyBallImage =
  'https://www.figma.com/api/mcp/asset/39989fbd-f75c-4e0a-a947-e6e24c1f6666'
const emptyBallMaskImage =
  'https://www.figma.com/api/mcp/asset/058a28fd-56e5-4038-82b6-e8bf0888999f'
const emptyBallTextureImage =
  'https://www.figma.com/api/mcp/asset/b4f954f5-c928-45dc-9e6b-8a454d59ce16'
const emptyBubbleImage =
  'https://www.figma.com/api/mcp/asset/ebd04875-a95b-483f-a499-7db249740546'
const emptyExclamationImage =
  'https://www.figma.com/api/mcp/asset/b5d9882f-c0ec-4fe3-a295-f27e0ffef37e'

interface CommunityEmptyStateProps {
  onExploreFriends: () => void
}

export const CommunityEmptyState = ({
  onExploreFriends,
}: CommunityEmptyStateProps) => {
  return (
    <section className="flex w-full flex-col items-center gap-4 px-4 py-20">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex w-full flex-col items-center justify-center pt-2 text-center">
          <p className="body-lg-bold text-usage-text-default">
            아직 등록된 친구가 없어요.
          </p>
          <p className="body-sm-light text-brand-neutral-80">
            친구를 찾아 추가해 보세요.
          </p>
        </div>

        <div className="flex w-full items-center justify-center py-2">
          <div className="relative h-[114px] w-[83px]">
            <img
              alt=""
              aria-hidden="true"
              src={emptyShadowImage}
              className="absolute bottom-0 left-0 h-7 w-[83px]"
            />
            <div className="absolute left-[17px] top-[52px] h-[54px] w-[49px]">
              <img
                alt=""
                aria-hidden="true"
                src={emptyBallImage}
                className="absolute left-0 top-0 size-12"
              />
              <div
                className="absolute -left-[0.5px] -top-1 h-[53.401px] w-[48.971px]"
                style={{
                  WebkitMaskImage: `url('${emptyBallMaskImage}')`,
                  WebkitMaskPosition: '0.491px 4.017px',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskSize: '47.995px 47.995px',
                  maskImage: `url('${emptyBallMaskImage}')`,
                  maskPosition: '0.491px 4.017px',
                  maskRepeat: 'no-repeat',
                  maskSize: '47.995px 47.995px',
                }}
              >
                <img
                  alt=""
                  aria-hidden="true"
                  src={emptyBallTextureImage}
                  className="size-full"
                />
              </div>
            </div>
            <img
              alt=""
              aria-hidden="true"
              src={emptyBubbleImage}
              className="absolute left-[24.64px] top-0 h-[40.913px] w-[37.215px]"
            />
            <img
              alt=""
              aria-hidden="true"
              src={emptyExclamationImage}
              className="absolute left-[40.61px] top-[6.8px] h-[21.194px] w-[5.227px]"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onExploreFriends}
        className="flex h-10 items-center justify-center rounded-large bg-brand-secondary-default px-3 body-md-medium text-brand-neutral-white"
      >
        친구 탐색하기
      </button>
    </section>
  )
}

export default CommunityEmptyState
