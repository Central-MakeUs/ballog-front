export const formatDate = (d: Date) =>
  d
    .toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })
    .replace(/\.\s/g, '-')
    .replace(/\.$/, '')
