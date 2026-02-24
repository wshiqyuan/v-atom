import type { VNode } from 'vue'
import type { TooltipProps } from '../../tooltip/src/types'

export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[]
  hideAfterClick?: boolean
}

export interface MenuOption {
  label: string | VNode
  key: string | number
  disabled?: boolean
  divided?: boolean
}

export interface DropdownEmits {
  (e: 'visibleChange', visible: boolean): void
  (e: 'select', key: MenuOption): void
}

export interface DropdownInstance {
  show: () => void
  hide: () => void
}
