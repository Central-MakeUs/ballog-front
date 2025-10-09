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
      {
        imageUrl: 'https://example.com/image2.jpg',
        createdAt: '2025-07-14T18:35:00Z',
      },
      {
        imageUrl: 'https://example.com/image3.jpg',
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
    result: 'LOSS',
    baseballTeam: 'SSG_LANDERS',
    positiveEmotionPercent: 40,
    negativeEmotionPercent: 60,
    defaultImageUrl: 'https://example.com/default2.jpg',
    imageList: [],
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
    result: null,
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
    result: null,
    baseballTeam: 'DOOSAN_BEARS',
    positiveEmotionPercent: 50,
    negativeEmotionPercent: 50,
    defaultImageUrl: 'https://example.com/default4.jpg',
    imageList: [],
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
    result: null,
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
    result: null,
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

  101: {
    matchRecordId: 201,
    matchesId: 101,
    stadium: 'JAMSIL',
    homeTeam: 'LG_TWINS',
    awayTeam: 'SSG_LANDERS',
    matchDate: '2025-10-05',
    matchTime: { hour: 18, minute: 30, second: 0, nano: 0 },
    userId: 7,
    watchCnt: 2,
    result: 'WIN',
    baseballTeam: 'LG_TWINS',
    positiveEmotionPercent: 85,
    negativeEmotionPercent: 15,
    defaultImageUrl: 'https://example.com/default101.jpg',
    imageList: [
      {
        imageUrl: 'https://example.com/image101-1.jpg',
        createdAt: '2025-10-05T18:45:00Z',
      },
      {
        imageUrl: 'https://example.com/image101-2.jpg',
        createdAt: '2025-10-05T19:00:00Z',
      },
    ],
    emotionGroupList: [
      {
        groupStart: '2025-10-05T19:15:00Z',
        emotionType: 'POSITIVE',
        count: 3,
      },
    ],
  },

  102: {
    matchRecordId: 202,
    matchesId: 102,
    stadium: 'DAEJEON',
    homeTeam: 'HANWHA_EAGLES',
    awayTeam: 'KIA_TIGERS',
    matchDate: '2025-10-05',
    matchTime: { hour: 18, minute: 30, second: 0, nano: 0 },
    userId: 8,
    watchCnt: 1,
    result: 'LOSS',
    baseballTeam: 'HANWHA_EAGLES',
    positiveEmotionPercent: 30,
    negativeEmotionPercent: 70,
    defaultImageUrl: 'https://example.com/default102.jpg',
    imageList: [],
    emotionGroupList: [
      {
        groupStart: '2025-10-05T19:10:00Z',
        emotionType: 'NEGATIVE',
        count: 2,
      },
    ],
  },

  103: {
    matchRecordId: 203,
    matchesId: 103,
    stadium: 'SUWON',
    homeTeam: 'KT_WIZ',
    awayTeam: 'DOOSAN_BEARS',
    matchDate: '2025-10-06',
    matchTime: { hour: 18, minute: 30, second: 0, nano: 0 },
    userId: 9,
    watchCnt: 4,
    result: 'WIN',
    baseballTeam: 'KT_WIZ',
    positiveEmotionPercent: 75,
    negativeEmotionPercent: 25,
    defaultImageUrl: 'https://example.com/default103.jpg',
    imageList: [
      {
        imageUrl: 'https://example.com/image103-1.jpg',
        createdAt: '2025-10-06T18:50:00Z',
      },
    ],
    emotionGroupList: [
      {
        groupStart: '2025-10-06T19:20:00Z',
        emotionType: 'POSITIVE',
        count: 3,
      },
    ],
  },

  104: {
    matchRecordId: 204,
    matchesId: 104,
    stadium: 'SAJIK',
    homeTeam: 'LOTTE_GIANTS',
    awayTeam: 'NC_DINOS',
    matchDate: '2025-10-06',
    matchTime: { hour: 18, minute: 30, second: 0, nano: 0 },
    userId: 10,
    watchCnt: 3,
    result: 'LOSS',
    baseballTeam: 'LOTTE_GIANTS',
    positiveEmotionPercent: 45,
    negativeEmotionPercent: 55,
    defaultImageUrl: 'https://example.com/default104.jpg',
    imageList: [
      {
        imageUrl: 'https://example.com/image104-1.jpg',
        createdAt: '2025-10-06T18:45:00Z',
      },
      {
        imageUrl: 'https://example.com/image104-2.jpg',
        createdAt: '2025-10-06T19:00:00Z',
      },
    ],
    emotionGroupList: [
      {
        groupStart: '2025-10-06T19:30:00Z',
        emotionType: 'NEGATIVE',
        count: 2,
      },
    ],
  },

  105: {
    matchRecordId: 205,
    matchesId: 105,
    stadium: 'DAEJEON',
    homeTeam: 'HANWHA_EAGLES',
    awayTeam: 'KIA_TIGERS',
    matchDate: '2025-10-06',
    matchTime: { hour: 18, minute: 30, second: 0, nano: 0 },
    userId: 11,
    watchCnt: 1,
    result: 'WIN',
    baseballTeam: 'HANWHA_EAGLES',
    positiveEmotionPercent: 65,
    negativeEmotionPercent: 35,
    defaultImageUrl: 'https://example.com/default105.jpg',
    imageList: [
      {
        imageUrl: 'https://example.com/image105-1.jpg',
        createdAt: '2025-10-06T18:55:00Z',
      },
    ],
    emotionGroupList: [
      {
        groupStart: '2025-10-06T19:20:00Z',
        emotionType: 'POSITIVE',
        count: 1,
      },
    ],
  },

  106: {
    matchRecordId: 206,
    matchesId: 106,
    stadium: 'SAJIK',
    homeTeam: 'LOTTE_GIANTS',
    awayTeam: 'NC_DINOS',
    matchDate: '2025-10-06',
    matchTime: { hour: 18, minute: 30, second: 0, nano: 0 },
    userId: 12,
    watchCnt: 0,
    result: null,
    baseballTeam: 'NC_DINOS',
    positiveEmotionPercent: 50,
    negativeEmotionPercent: 50,
    defaultImageUrl: 'https://example.com/default106.jpg',
    imageList: [],
    emotionGroupList: [
      {
        groupStart: '2025-10-06T19:00:00Z',
        emotionType: 'NEGATIVE',
        count: 1,
      },
    ],
  },
} as const
