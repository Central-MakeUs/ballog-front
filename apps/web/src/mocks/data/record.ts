import type {
  Record,
  RecordDetailResponse,
} from '@/entities/record/model/record.type'

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
      positiveEmotionPercent: 60,
      negativeEmotionPercent: 40,
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
      positiveEmotionPercent: 80,
      negativeEmotionPercent: 20,
      defaultImageUrl: null,
      imageList: [
        {
          imageUrl:
            'https://ballog-bucket.s3.ap-northeast-2.amazonaws.com/images/sample-image-1.jpg',
          createdAt: '2025-07-08T11:15:30.123456',
        },
      ],
    },
  ],
}
