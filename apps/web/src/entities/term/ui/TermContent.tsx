import {
  MARKETING_AGREEMENT_TERM,
  PRIVACY_AGREEMENT_TERM,
  SERVICE_AGREEMENT_TERM,
} from '../constants'

export type TermType = 'marketing' | 'privacy' | 'service'

export const TermContent = ({ type }: { type: TermType }) => {
  return (
    <div className="w-full px-4 py-4 overflow-x-hidden">
      {type === 'marketing' && (
        <div className="text-usage-text-default body-md-regular w-full whitespace-pre-line break-words">
          {MARKETING_AGREEMENT_TERM}
        </div>
      )}
      {type === 'privacy' && (
        <div className="text-usage-text-default body-md-regular w-full whitespace-pre-line break-words">
          {PRIVACY_AGREEMENT_TERM}
        </div>
      )}
      {type === 'service' && (
        <div className="text-usage-text-default body-md-regular w-full whitespace-pre-line break-words">
          {SERVICE_AGREEMENT_TERM}
        </div>
      )}
    </div>
  )
}
