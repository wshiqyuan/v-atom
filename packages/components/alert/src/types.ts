export type AlertType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface AlertProps {
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
