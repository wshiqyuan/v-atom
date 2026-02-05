export type AlertType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface AlertProps {
  showIcon?: boolean
  title?: string
  content?: string
  type: AlertType
  effect?: 'light' | 'dark'
  closable?: boolean
}

export interface AlertEmits {
  (e: 'close'): void
}

export interface AlertInstance {
  hide: () => void
}

export const IconTypeMap = {
  primary: 'circle-info',
  danger: 'circle-xmark',
  info: 'circle-info',
  success: 'circle-check',
  warning: 'circle-exclamation',
} as const
