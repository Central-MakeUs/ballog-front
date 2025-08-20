import { toast } from 'sonner'

const DEFAULT_DURATION = 1500

export const Toast = {
  success: (message: string, duration: number = DEFAULT_DURATION) =>
    toast.success(message, { duration }),

  error: (message: string, duration: number = DEFAULT_DURATION) =>
    toast.error(message, { duration }),

  info: (message: string, duration: number = DEFAULT_DURATION) =>
    toast(message, { duration }),
}
