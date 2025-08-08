import { useMemo, useState } from 'react'

import {
  type TermItemData,
  type TermType,
} from '@/entities/term/model/term.type'

export const useTermAgreement = (initialTerms: TermItemData[]) => {
  const [terms, setTerms] = useState(initialTerms)

  const allChecked = useMemo(() => {
    return terms.every((term) => term.checked)
  }, [terms])

  const isNextEnabled = useMemo(() => {
    return terms.every((term) => (term.required ? term.checked : true))
  }, [terms])

  // 개별 약관 체크
  const toggleTerm = (id: TermType) => {
    setTerms((prev) =>
      prev.map((term) =>
        term.id === id ? { ...term, checked: !term.checked } : term,
      ),
    )
  }

  // 전체 약관 체크
  const toggleAll = (checked: boolean) => {
    setTerms((prev) => prev.map((term) => ({ ...term, checked })))
  }

  return {
    terms,
    allChecked,
    isNextEnabled,
    toggleTerm,
    toggleAll,
  }
}
