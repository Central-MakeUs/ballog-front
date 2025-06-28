// RN에서 사용할 메시지 페이로드 타입
export type PostMessagePayload = {
  message: string
}

// {
//   eventName: string
//   payload: PostMessagePayload
// }
export type WebMessageEvent = {
  eventName: string
  payload: PostMessagePayload
}

// RN에서 사용할 메시지 스키마 타입
// key 값으로 이벤트 이름을 정의
// value에는 payload 포함
// 스키마 정의 때 사용
// 예시:
// {
//   'test-message': {
//     payload: { message: string }
//   }
//   'test-message-2': {
//     payload: { message: string }
//   }
// }
export type PostMessageSchemaObject = {
  [K: string]: {
    payload: PostMessagePayload
  }
}

// RN에서 사용할 메시지 이벤트 타입
// 서로 보낼 때 사용하는 타입
// 이벤트 이름과 페이로드를 담고 있음
// 유니온 타입
// 예시:
// {
//   eventName: 'test-message'
//   payload: { message: string }
// } | {
//   eventName: 'test-message-2'
//   payload: { message: string }
// }
// post하는 message 타입으로, 정의된 스키마에서 존재하는 이벤트 이름과 페이로드만 사용 가능
export type PostMessageEvent<T extends PostMessageSchemaObject> = {
  [K in keyof T]: {
    eventName: K
    payload: T[K]['payload']
  }
}[keyof T]
