import type { Placement } from '@popperjs/core'

export interface TooltipProps {
  trigger?: 'hover' | 'click'
  content?: string
  placement?: Placement
}

export interface TooltipEmits {
  (e: 'visibleChange', visible: boolean): void
}
