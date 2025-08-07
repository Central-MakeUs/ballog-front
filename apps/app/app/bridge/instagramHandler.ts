import { Linking } from 'react-native'
import type { InstagramPayload } from '@ballog/bridge'

export const instagramHandler = () => ({
  OPEN_INSTAGRAM: (payload?: InstagramPayload) => {
    const username = payload?.username

    const scheme = `instagram://user?username=${username}`
    const fallback = `https://instagram.com/${username}`

    Linking.openURL(scheme).catch(() => {
      Linking.openURL(fallback)
    })
  },
})
