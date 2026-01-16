import { useSyncExternalStore } from 'react'

const ACCESS_TOKEN_KEY = 'accessToken'
const ACCESS_TOKEN_EVENT = 'ballog:accessToken'

// 지금 읽어야하는 store 값을 반환
const getSnapshot = () => localStorage.getItem(ACCESS_TOKEN_KEY) ?? ''

// store가 바뀌면 React에게 알려주는 함수
const subscribe = (onStoreChange: () => void) => {
  window.addEventListener(ACCESS_TOKEN_EVENT, onStoreChange)
  return () => {
    window.removeEventListener(ACCESS_TOKEN_EVENT, onStoreChange)
  }
}

// 이 함수로 이벤트를 발생시키면 subscribe에서 등록한 이벤트리스너인 onStoreChange 함수가 호출된다.
// 그럼 React가 인지하고 다시 getSnapshot을 호출하고 리렌더링
// useSyncExternalStore을 사용하고 있는 컴포넌트들이 리렌더링 된다.
const emitAccessTokenChanged = () => {
  dispatchEvent(new StorageEvent(ACCESS_TOKEN_EVENT))
}

// 로컬스토리지 accessToken을 관리하는 훅
export const useAccessTokenStorage = () => {
  // 레퍼런스
  // https://medium.com/hal-ang/react-18-storage%EB%A5%BC-%EC%83%81%ED%83%9C%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0-usesyncexternalstore-181e6d5778d3
  const accessToken = useSyncExternalStore(
    subscribe,
    getSnapshot,
  )

  const setAccessTokenInStorage = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
    emitAccessTokenChanged()
  }

  const clearSessionStorage = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    emitAccessTokenChanged()
  }

  return { accessToken, setAccessTokenInStorage, clearSessionStorage }
}
