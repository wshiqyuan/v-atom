import type { ComponentInternalInstance, VNode } from 'vue'

export interface MessageProps {
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: 'info' | 'success' | 'warning' | 'danger'
  onDestroy: () => void
  zIndex: number
  id: string
  offset?: number
  transitionName?: string
}

export interface MessageContext {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: MessageProps
  destroy: () => void
}
export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>
