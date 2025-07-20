import type { Emotion } from '@/entities/record/model/emotion.type'

export const emotion = {
  data: {
    matchesDate: '2025-07-18',
    matchesTime: '16:30:00',
    homeTeam: 'LG_TWINS',
    awayTeam: 'LOTTE_GIANTS',
    stadium: 'JAMSIL',
    positivePercent: 60.0,
    negativePercent: 40.0,
    recentEmotion: 'POSITIVE',
    defaultImageUrl:
      'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/24b81566-62aa-4351-854c-a4a79c22050c.svg',
  } as Emotion,
  delay: 1000,
}
