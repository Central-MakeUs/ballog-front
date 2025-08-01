import { useEffect, type RefObject } from 'react'

export const useGraphObserver = (
  chartRef: RefObject<HTMLDivElement | null>,
) => {
  useEffect(() => {
    if (!chartRef.current) return

    // MutationObserver로 recharts DOM 변경 감지
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // recharts가 렌더링된 후 rect 찾기
          const rectElement = chartRef.current?.querySelector(
            '.recharts-cartesian-grid-bg',
          )
          if (rectElement) {
            rectElement.setAttribute('rx', '12')
            rectElement.setAttribute('ry', '12')
            observer.disconnect() // 한 번 적용 후 observer 정리
          }
        }
      })
    })

    // chartRef 하위의 모든 변경사항 관찰
    observer.observe(chartRef.current, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [chartRef])
}
