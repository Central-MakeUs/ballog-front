import type { RecordingResponse } from '@/entities/record/model/recording.type'

export const recording: Record<number, RecordingResponse> = {
  1: {
    matchRecordId: 101,
    matchesId: 1,
    stadium: 'JAMSIL',
    homeTeam: 'LOTTE_GIANTS',
    awayTeam: 'KT_WIZ',
    matchDate: '2025-07-14',
    matchTime: { hour: 18, minute: 30, second: 0, nano: 0 },
    userId: 1,
    watchCnt: 2,
    result: 'WIN',
    baseballTeam: 'LOTTE_GIANTS',
    positiveEmotionPercent: 70,
    negativeEmotionPercent: 30,
    defaultImageUrl: 'https://example.com/default1.jpg',
    imageList: [
      {
        imageUrl: 'https://example.com/image1.jpg',
        createdAt: '2025-07-14T18:35:00Z',
      },
    ],
    emotionGroupList: [
      {
        groupStart: '2025-07-14T18:40:00Z',
        emotionType: 'POSITIVE',
        count: 3,
      },
    ],
  },

  2: {
    matchRecordId: 102,
    matchesId: 2,
    stadium: 'JAMSIL',
    homeTeam: 'LG_TWINS',
    awayTeam: 'SSG_LANDERS',
    matchDate: '2025-07-03',
    matchTime: { hour: 18, minute: 30, second: 0, nano: 0 },
    userId: 2,
    watchCnt: 1,
    result: 'LOSE',
    baseballTeam: 'SSG_LANDERS',
    positiveEmotionPercent: 40,
    negativeEmotionPercent: 60,
    defaultImageUrl: 'https://example.com/default2.jpg',
    imageList: [
      {
        imageUrl: 'https://example.com/image2.jpg',
        createdAt: '2025-07-03T18:50:00Z',
      },
    ],
    emotionGroupList: [
      {
        groupStart: '2025-07-03T19:00:00Z',
        emotionType: 'NEGATIVE',
        count: 2,
      },
    ],
  },

  3: {
    matchRecordId: 103,
    matchesId: 3,
    stadium: 'JAMSIL',
    homeTeam: 'LG_TWINS',
    awayTeam: 'SSG_LANDERS',
    matchDate: '2025-07-03',
    matchTime: { hour: 19, minute: 30, second: 0, nano: 0 },
    userId: 3,
    watchCnt: 3,
    result: 'WIN',
    baseballTeam: 'LG_TWINS',
    positiveEmotionPercent: 90,
    negativeEmotionPercent: 10,
    defaultImageUrl: 'https://example.com/default3.jpg',
    imageList: [
      {
        imageUrl: 'https://example.com/image3.jpg',
        createdAt: '2025-07-03T19:40:00Z',
      },
    ],
    emotionGroupList: [
      {
        groupStart: '2025-07-03T20:00:00Z',
        emotionType: 'POSITIVE',
        count: 4,
      },
    ],
  },

  4: {
    matchRecordId: 104,
    matchesId: 4,
    stadium: 'JAMSIL',
    homeTeam: 'DOOSAN_BEARS',
    awayTeam: 'SSG_LANDERS',
    matchDate: '2025-07-03',
    matchTime: { hour: 18, minute: 30, second: 0, nano: 0 },
    userId: 4,
    watchCnt: 0,
    result: 'DRAW',
    baseballTeam: 'DOOSAN_BEARS',
    positiveEmotionPercent: 50,
    negativeEmotionPercent: 50,
    defaultImageUrl: 'https://example.com/default4.jpg',
    imageList: [
      {
        imageUrl: 'https://example.com/image4.jpg',
        createdAt: '2025-07-03T18:33:00Z',
      },
    ],
    emotionGroupList: [
      {
        groupStart: '2025-07-03T18:40:00Z',
        emotionType: 'NEGATIVE',
        count: 1,
      },
    ],
  },

  5: {
    matchRecordId: 105,
    matchesId: 5,
    stadium: 'JAMSIL',
    homeTeam: 'LG_TWINS',
    awayTeam: 'SSG_LANDERS',
    matchDate: '2025-07-03',
    matchTime: { hour: 19, minute: 30, second: 0, nano: 0 },
    userId: 5,
    watchCnt: 5,
    result: 'WIN',
    baseballTeam: 'SSG_LANDERS',
    positiveEmotionPercent: 80,
    negativeEmotionPercent: 20,
    defaultImageUrl: 'https://example.com/default5.jpg',
    imageList: [
      {
        imageUrl: 'https://example.com/image5.jpg',
        createdAt: '2025-07-03T19:45:00Z',
      },
    ],
    emotionGroupList: [
      {
        groupStart: '2025-07-03T20:10:00Z',
        emotionType: 'POSITIVE',
        count: 2,
      },
    ],
  },

  6: {
    matchRecordId: 106,
    matchesId: 6,
    stadium: 'JAMSIL',
    homeTeam: 'DOOSAN_BEARS',
    awayTeam: 'SSG_LANDERS',
    matchDate: '2025-07-03',
    matchTime: { hour: 18, minute: 30, second: 0, nano: 0 },
    userId: 6,
    watchCnt: 4,
    result: 'LOSE',
    baseballTeam: 'DOOSAN_BEARS',
    positiveEmotionPercent: 25,
    negativeEmotionPercent: 75,
    defaultImageUrl: 'https://example.com/default6.jpg',
    imageList: [
      {
        imageUrl: 'https://example.com/image6.jpg',
        createdAt: '2025-07-03T18:55:00Z',
      },
    ],
    emotionGroupList: [
      {
        groupStart: '2025-07-03T19:15:00Z',
        emotionType: 'NEGATIVE',
        count: 3,
      },
    ],
  },
} as const
