import type { EmotionType } from '@/entities/record/model/emotion.type'

export const emotionGet: { data: EmotionType; delay: number } = {
  data: {
    matchesDate: '2025-07-18',
    matchesTime: {
      hour: 16,
      minute: 30,
      second: 0,
      nano: 0,
    },
    homeTeam: 'LG_TWINS',
    awayTeam: 'LOTTE_GIANTS',
    stadium: 'JAMSIL',
    positivePercent: 50.0,
    negativePercent: 50.0,
    recentEmotion: 'POSITIVE',
    defaultImageUrl:
      'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/24b81566-62aa-4351-854c-a4a79c22050c.svg',
  },
  delay: 1000,
}

export const emotionPostPositive: { data: EmotionType; delay: number } = {
  data: {
    matchesDate: '2025-07-18',
    matchesTime: {
      hour: 16,
      minute: 30,
      second: 0,
      nano: 0,
    },
    homeTeam: 'LG_TWINS',
    awayTeam: 'LOTTE_GIANTS',
    stadium: 'JAMSIL',
    positivePercent: 70.0,
    negativePercent: 30.0,
    recentEmotion: 'POSITIVE',
    defaultImageUrl:
      'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/24b81566-62aa-4351-854c-a4a79c22050c.svg',
  },
  delay: 1000,
}

export const emotionPostNegative: { data: EmotionType; delay: number } = {
  data: {
    matchesDate: '2025-07-18',
    matchesTime: {
      hour: 16,
      minute: 30,
      second: 0,
      nano: 0,
    },
    homeTeam: 'LG_TWINS',
    awayTeam: 'LOTTE_GIANTS',
    stadium: 'JAMSIL',
    positivePercent: 100.0,
    negativePercent: 0.0,
    recentEmotion: 'NEGATIVE',
    defaultImageUrl:
      'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/24b81566-62aa-4351-854c-a4a79c22050c.svg',
  },
  delay: 1000,
}
