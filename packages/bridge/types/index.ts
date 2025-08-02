import { type WebViewMessageEvent } from 'react-native-webview'
// 이미지 데이터 타입 정의
export type ImageData = {
  uri: string
  base64: string
  fileName: string
  createdAt: string
}

// 기본 메시지 페이로드 타입
export type BasicMessagePayload = {
  message: string
}

// 이미지 선택 이벤트용 페이로드 타입
export type ImageSelectedPayload = {
  message: string
  imageDataList: ImageData[]
}

export type ImageDownloadPayload = {
  imageUrl: string
}

// 인스타그램 스토리 공유용 페이로드 타입
export type InstagramSharePayload = {
  imageUrl: string
}

export type NotificationOnPayload = {
  token: string
}

// 각 이벤트별 스키마 정의
export type BridgeMessageSchema = {
  OPEN_CAMERA: {
    payload: BasicMessagePayload
  }
  PICK_IMAGE: {
    payload: BasicMessagePayload
  }
  IMAGE_SELECTED: {
    payload: ImageSelectedPayload
  }
  DOWNLOAD_IMAGE: {
    payload: ImageDownloadPayload
  }
  IMAGE_DOWNLOAD_RESPONSE: {
    payload: BasicMessagePayload
  }
  SHARE_TO_INSTAGRAM_STORY: {
    payload: InstagramSharePayload
  }
  INSTAGRAM_SHARE_RESPONSE: {
    payload: BasicMessagePayload
  }
  CAMERA_SHOT: {
    payload: ImageData
  }
  NOTIFICATION_ON: {
    payload: NotificationOnPayload
  }
  NOTIFICATION_OFF: {
    payload: { message: string }
  }
}

// 기존 PostMessagePayload는 유니온 타입으로 변경
export type PostMessagePayload =
  | BasicMessagePayload
  | ImageSelectedPayload
  | ImageDownloadPayload
  | InstagramSharePayload
  | ImageData
  | NotificationOnPayload

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

// AppBridge 인터페이스
export interface AppBridge<
  T extends PostMessageSchemaObject = BridgeMessageSchema,
> {
  send: <K extends keyof T>(eventName: K, payload: T[K]['payload']) => void
  on: (
    eventName: string,
    handler: (payload?: T[keyof T]['payload']) => void,
  ) => void
  processMessage: (event: WebViewMessageEvent) => void
  //legacy
  handleMessage: (event: WebViewMessageEvent) => WebMessageEvent | null
}
