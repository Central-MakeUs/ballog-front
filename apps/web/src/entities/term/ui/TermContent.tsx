import type { ComponentPropsWithoutRef } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

import {
  MARKETING_AGREEMENT_TERM,
  PRIVACY_AGREEMENT_TERM,
  SERVICE_AGREEMENT_TERM,
} from '../constants'

export type TermType = 'marketing' | 'privacy' | 'service'

const TERM_MAP: Record<TermType, string> = {
  marketing: MARKETING_AGREEMENT_TERM,
  privacy: PRIVACY_AGREEMENT_TERM,
  service: SERVICE_AGREEMENT_TERM,
}

const components: Components = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1
      className="title-md-bold text-usage-text-default mt-6 mb-3"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="title-sm-bold text-usage-text-default mt-6 mb-3"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="body-md-bold text-usage-text-default mt-6 mb-2" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p
      className="body-md-regular text-usage-text-default my-2 break-words"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="body-md-bold text-usage-text-default" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="list-disc pl-5 my-2 body-md-regular text-usage-text-default"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="list-decimal pl-5 my-2 body-md-regular text-usage-text-default"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="my-1 break-words" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="my-4 border-brand-neutral-30" {...props} />
  ),
  a: ({ href, ...props }: ComponentPropsWithoutRef<'a'>) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand-primary-default underline break-all"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-3 overflow-x-auto">
      <table
        className="w-full border-collapse border border-brand-neutral-30 body-sm-regular text-usage-text-default"
        {...props}
      />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-brand-neutral-10" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="border border-brand-neutral-30 px-2 py-1 body-sm-bold text-left align-top"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td
      className="border border-brand-neutral-30 px-2 py-1 align-top"
      {...props}
    />
  ),
}

export const TermContent = ({ type }: { type: TermType }) => {
  return (
    <div className="w-full px-4 py-4 overflow-x-hidden">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {TERM_MAP[type]}
      </ReactMarkdown>
    </div>
  )
}
