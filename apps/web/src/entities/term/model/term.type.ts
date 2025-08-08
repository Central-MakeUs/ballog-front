export type TermType = 'privacy' | 'service' | 'marketing'

export interface TermItemData {
  id: TermType
  text: string
  required: boolean
  checked: boolean
}
