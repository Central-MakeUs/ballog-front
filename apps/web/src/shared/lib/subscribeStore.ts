export class SubscribeStore<T> {
  private static instances = new Map<string, SubscribeStore<unknown>>()
  private Listeners = new Set<() => void>()
  private getSnapShot: () => T

  private constructor(getSnapShot: () => T) {
    this.getSnapShot = getSnapShot
  }

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

  public getSnapshot = () => this.getSnapShot()

  public notify() {
    this.Listeners.forEach((listener) => listener())
  }
}
