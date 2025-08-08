import type {
  Record,
  RecordDetailResponse,
  EmotionGroup,
} from '@/entities/record/model/record.type'

const emotionGroupListShort: EmotionGroup[] = [
  {
    groupStart: '2025-07-28T19:04:00',
    emotionType: 'POSITIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:04:00',
    emotionType: 'NEGATIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:05:01',
    emotionType: 'POSITIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:05:01',
    emotionType: 'NEGATIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:06:02',
    emotionType: 'POSITIVE',
    count: 54,
  },
  {
    groupStart: '2025-07-28T19:06:02',
    emotionType: 'NEGATIVE',
    count: 14,
  },
  {
    groupStart: '2025-07-28T19:07:03',
    emotionType: 'POSITIVE',
    count: 24,
  },
  {
    groupStart: '2025-07-28T19:07:03',
    emotionType: 'NEGATIVE',
    count: 14,
  },
  {
    groupStart: '2025-07-28T19:08:04',
    emotionType: 'POSITIVE',
    count: 54,
  },
  {
    groupStart: '2025-07-28T19:08:04',
    emotionType: 'NEGATIVE',
    count: 34,
  },
  {
    groupStart: '2025-07-28T19:09:05',
    emotionType: 'POSITIVE',
    count: 8,
  },
  {
    groupStart: '2025-07-28T19:09:05',
    emotionType: 'NEGATIVE',
    count: 6,
  },
]

export const emotionGroupList: EmotionGroup[] = [
  {
    groupStart: '2025-07-28T19:04:00',
    emotionType: 'POSITIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:04:00',
    emotionType: 'NEGATIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:05:01',
    emotionType: 'POSITIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:05:01',
    emotionType: 'NEGATIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:06:02',
    emotionType: 'POSITIVE',
    count: 54,
  },
  {
    groupStart: '2025-07-28T19:06:02',
    emotionType: 'NEGATIVE',
    count: 14,
  },
  {
    groupStart: '2025-07-28T19:07:03',
    emotionType: 'POSITIVE',
    count: 24,
  },
  {
    groupStart: '2025-07-28T19:07:03',
    emotionType: 'NEGATIVE',
    count: 14,
  },
  {
    groupStart: '2025-07-28T19:08:04',
    emotionType: 'POSITIVE',
    count: 54,
  },
  {
    groupStart: '2025-07-28T19:08:04',
    emotionType: 'NEGATIVE',
    count: 34,
  },
  {
    groupStart: '2025-07-28T19:09:05',
    emotionType: 'POSITIVE',
    count: 8,
  },
  {
    groupStart: '2025-07-28T19:09:05',
    emotionType: 'NEGATIVE',
    count: 6,
  },
  {
    groupStart: '2025-07-28T19:10:06',
    emotionType: 'POSITIVE',
    count: 2,
  },
  {
    groupStart: '2025-07-28T19:10:06',
    emotionType: 'NEGATIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:11:06',
    emotionType: 'POSITIVE',
    count: 2,
  },
  {
    groupStart: '2025-07-28T19:11:06',
    emotionType: 'NEGATIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:12:06',
    emotionType: 'POSITIVE',
    count: 2,
  },
  {
    groupStart: '2025-07-28T19:12:06',
    emotionType: 'NEGATIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:13:06',
    emotionType: 'POSITIVE',
    count: 2,
  },
  {
    groupStart: '2025-07-28T19:13:06',
    emotionType: 'NEGATIVE',
    count: 14,
  },
  {
    groupStart: '2025-07-28T19:14:06',
    emotionType: 'POSITIVE',
    count: 2,
  },
  {
    groupStart: '2025-07-28T19:14:06',
    emotionType: 'NEGATIVE',
    count: 41,
  },
  {
    groupStart: '2025-07-28T19:15:06',
    emotionType: 'POSITIVE',
    count: 21,
  },
  {
    groupStart: '2025-07-28T19:15:06',
    emotionType: 'NEGATIVE',
    count: 4,
  },
  {
    groupStart: '2025-07-28T19:16:06',
    emotionType: 'POSITIVE',
    count: 22,
  },
  {
    groupStart: '2025-07-28T19:16:06',
    emotionType: 'NEGATIVE',
    count: 4,
  },
]

export const record: {
  records: Record[]
  recordDetails: RecordDetailResponse[]
} = {
  records: [
    {
      matchRecordId: 5,
      matchesId: 4,
      homeTeam: 'LG_TWINS',
      awayTeam: 'KT_WIZ',
      matchDate: '2025-07-08',
      matchTime: '21:30',
      userId: 1,
      watchCnt: 4,
      result: 'DRAW',
      baseballTeam: 'LG_TWINS',
    },
    {
      matchRecordId: 4,
      matchesId: 3,
      homeTeam: 'KIA_TIGERS',
      awayTeam: 'HANWHA_EAGLES',
      matchDate: '2025-07-08',
      matchTime: '10:30',
      userId: 1,
      watchCnt: 3,
      result: 'WIN',
      baseballTeam: 'LG_TWINS',
    },
  ],
  recordDetails: [
    {
      matchRecordId: 5,
      matchesId: 4,
      homeTeam: 'LG_TWINS',
      awayTeam: 'KT_WIZ',
      stadium: '잠실야구장',
      matchDate: '2025-07-08',
      matchTime: '21:30',
      userId: 1,
      watchCnt: 4,
      result: 'DRAW',
      baseballTeam: 'LG_TWINS',
      totalPositiveEmotionPercent: 60,
      totalNegativeEmotionPercent: 40,
      defaultImageUrl: null,
      imageList: [
        {
          imageUrl:
            'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/a5ca9d7f-3514-41b7-9554-cf0de905e48a.png',
          createdAt: '2025-07-13T14:09:51.386663',
        },
        {
          imageUrl:
            'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/f47697b1-a2c2-4a60-bf5e-29014159b9a9.jpg',
          createdAt: '2025-07-13T14:09:51.386663',
        },
      ],
      emotionGroupList,
    },
    {
      matchRecordId: 4,
      matchesId: 3,
      homeTeam: 'KIA_TIGERS',
      awayTeam: 'HANWHA_EAGLES',
      stadium: '광주-기아 챔피언스 필드',
      matchDate: '2025-07-08',
      matchTime: '10:30',
      userId: 1,
      watchCnt: 3,
      result: 'WIN',
      baseballTeam: 'LG_TWINS',
      totalPositiveEmotionPercent: 80,
      totalNegativeEmotionPercent: 20,
      defaultImageUrl: null,
      imageList: [
        {
          imageUrl:
            'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/sample-image-1.jpg',
          createdAt: '2025-07-08T11:15:30.123456',
        },
      ],
      emotionGroupList: emotionGroupListShort,
    },
  ],
}
