import OnBoardFirst from '@/assets/onBoardingFirst.png'
import OnBoardingSecond from '@/assets/onBoardingSecond.png'
import OnBoardingThird from '@/assets/onBoardingThird.png'

export const OnBoardingData = [
  {
    id: 1,
    image: <img src={OnBoardFirst} />,
    title: '오늘의 경기, 가볍게 둘러보세요',
    subTitle: '응원팀 경기부터 오늘 열리는 모든 경기를\n손쉽게 탐색해요',
  },
  {
    id: 2,
    image: <img src={OnBoardingSecond} />,
    title: '기뻐요 vs 화나요, 감정도 기록이 돼요',
    subTitle: '경기 흐름 따라 바뀌는 감정을\n솔직하게 표현해보세요',
  },
  {
    id: 3,
    image: <img src={OnBoardingThird} />,
    title: '지금 이 순간을 사진으로 남겨요',
    subTitle: '경기장의 열기와 특별한 순간을\n실시간으로 담아보세요',
  },
]
