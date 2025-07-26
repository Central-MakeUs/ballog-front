/**
 * ISO 8601 형식의 날짜 문자열을 한국 시간 기준 HH:MM 형태로 변환합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열 (예: "2025-07-13T14:09:51.386663")
 * @returns 한국 시간 기준 시:분 형태 (예: "14:09")
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('ko-KR', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
