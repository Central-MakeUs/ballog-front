import type { ComponentType, SVGProps } from 'react'
import {
  AngryEmotionCharacter,
  HappyEmotionCharacter,
  NoEmotionCharacter,
} from '@ballog/asset/icons'

import type { EmotionType } from '@/entities/record/model/record.type'

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>

export interface EmotionConfigEntry {
  Character: SvgComponent
  label: string
  emoji: string
  badgeClass: string
}

export const EMOTION_CONFIG: Record<'none' | EmotionType, EmotionConfigEntry> =
  {
    none: {
      Character: NoEmotionCharacter,
      label: '감정없음',
      emoji: '🙂',
      badgeClass: 'bg-brand-neutral-20 text-brand-neutral-60',
    },
    POSITIVE: {
      Character: HappyEmotionCharacter,
      label: '기쁨',
      emoji: '😊',
      badgeClass: 'bg-brand-primary-subtle text-brand-primary-default',
    },
    NEGATIVE: {
      Character: AngryEmotionCharacter,
      label: '화남',
      emoji: '😠',
      badgeClass: 'bg-brand-red-subtle text-brand-red-default',
    },
  }
