export class SubscribeStore<T> {
  // 싱글톤 인스턴스 저장
  private static instances = new Map<string, SubscribeStore<unknown>>()
  // 구독중인 컴포넌트들 저장
  private Listeners = new Set<() => void>()
  private getSnapShot: () => T

  private constructor(getSnapShot: () => T) {
    this.getSnapShot = getSnapShot
  }

  // 싱글톤 인스턴스 반환
  public static getInstance<T>(
    key: string,
    getSnapShot: () => T,
  ): SubscribeStore<T> {
    if (!SubscribeStore.instances.get(key)) {
      SubscribeStore.instances.set(key, new SubscribeStore(getSnapShot))
    }
    return SubscribeStore.instances.get(key) as SubscribeStore<T>
  }

  // arrow function은 트랜스파일링하면 생성자에서 this binding
  // 일반 메소드는 호출 시 this binding ( SubscribeStore.prototype.subscribe = function(listener) { ... } )
  public subscribe = (listener: () => void) => {
    this.Listeners.add(listener)
    return () => {
      this.Listeners.delete(listener)
    }
  }

  // 현재 상태를 반환
  public getSnapshot = () => this.getSnapShot()

  // 구독중인 컴포넌트들에게  notify 이벤트를 발생시킴
  public notify() {
    this.Listeners.forEach((listener) => listener())
  }
}
