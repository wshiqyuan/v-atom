import type { Options, Placement } from '@popperjs/core'

export interface TooltipProps {
  trigger?: 'hover' | 'click'
  content?: string
  placement?: Placement
  manual?: boolean
  popperOptions?: Partial<Options>
  transtion?: string
  openDelay?: number
  closeDelay?: number
}

export interface TooltipEmits {
  (e: 'visibleChange', visible: boolean): void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}
