const CLICK_THRESHOLD_PX = 5

export type DragDirection = -1 | 1

export class DragSession {
  private lastX: number
  private lastT: number
  private moved = false

  public constructor(
    private readonly startX: number,
    private readonly startT: number,
    public readonly pointerId: number,
  ) {
    this.lastX = startX
    this.lastT = startT
  }

  /** 좌표 갱신 후, '클릭'에서 '드래그'로 막 전이됐다면 true 반환 */
  public update(x: number, t: number): boolean {
    this.lastX = x
    this.lastT = t
    if (!this.moved && Math.abs(this.dx) > CLICK_THRESHOLD_PX) {
      this.moved = true
      return true
    }
    return false
  }

  public get dx() {
    return this.lastX - this.startX
  }

  public get velocity() {
    return this.dx / Math.max(this.lastT - this.startT, 1)
  }

  public get direction(): DragDirection {
    return this.dx > 0 ? -1 : 1
  }

  public isClick() {
    return Math.abs(this.dx) <= CLICK_THRESHOLD_PX
  }
}
