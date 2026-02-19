import type { RecordResponse, RecordDetailResponse } from '../model/record.type'

interface RecordMainData {
  RecordMain: RecordResponse
  RecordDetail: RecordDetailResponse
}

export const DEFAULT_RECORD_DATA: RecordMainData = {
  RecordMain: {
    totalCount: 0,
    winRate: 0,
    totalNegativeEmotionPercent: 0,
    totalPositiveEmotionPercent: 0,
    records: [],
  },
  RecordDetail: {
    matchRecordId: 0,
    matchesId: 0,
    homeTeam: 'SSG_LANDERS',
    awayTeam: 'LG_TWINS',
    stadium: 'JAMSIL',
    matchDate: '2025.07.09 (수) 오후 6:30',
    matchTime: '18:00',
    userId: 0,
    watchCnt: 0,
    baseballTeam: 'SSG_LANDERS',
    result: null,
    positiveEmotionPercent: 0,
    negativeEmotionPercent: 0,
    defaultImageUrl: null,
    emotionGroupList: [],
    imageList: [],
  },
}
