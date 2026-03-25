import type { CreateMessageProps, MessageContext } from './types'
import { useZIndex } from '@v-atom/hooks/index'
import { h, render, shallowReactive } from 'vue'
import MessageConstructor from './Message.vue'

let seed = 1
const instances: MessageContext[] = shallowReactive([])

export function createMessage(props: CreateMessageProps) {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  const container = document.createElement('div')

  const destroy = () => {
    // 删除数组中的实例
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1)
      return
    instances.splice(idx, 1)
    render(null, container)
  }

  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }

  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy,
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)

  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destroy: manualDestroy,
  }
  instances.push(instance)

  return instance
}

export function getLastInstance() {
  return instances.at(-1)
}

export function getLastBottomOffset(id: string) {
  const idx = instances.findIndex(instance => instance.id === id)

  if (idx <= 0) {
    return 0
  }
  else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}

export function closeAllMessage() {
  instances.forEach((instance) => {
    instance.destroy()
  })
}
