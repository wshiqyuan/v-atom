import type { CreateMessageProps, MessageContext } from './types'
import { useZIndex } from '@v-atom/hooks/index'
import { h, render } from 'vue'
import MessageConstructor from './Message.vue'

let seed = 1

const instances: MessageContext[] = []

const injectContainer = (() => {
  if (typeof window !== 'undefined') {
    const container = document.createElement('div')
    container.className = 'va-message-container'
    return container
  }
  return null
})()

function createBox() {
  const item = document.createElement('div')
  item.className = 'va-message__item'
  if (!injectContainer)
    return item
  injectContainer.appendChild(item)
  return item
}

export function createMessage(props: CreateMessageProps) {
  if (!injectContainer)
    return

  if (!injectContainer.parentNode) {
    document.body.appendChild(injectContainer)
  }

  const { nextZIndex } = useZIndex()

  const id = `message_${seed++}`

  const $dom = createBox()

  const destroy = () => {
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1)
      return
    instances.splice(idx, 1)
    render(null, $dom)
    $dom.remove()

    if (injectContainer && instances.length === 0) {
      injectContainer.remove()
    }
  }

  const manualDestroy = () => {
    const _instance = instances.find(instance => instance.id === id)
    if (_instance) {
      _instance.vm.exposed!.visible.value = false
    }
  }

  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy,
  }

  const vnode = h(MessageConstructor, newProps)
  render(vnode, $dom)

  const vm = vnode.component!

  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    manualDestroy,
  }
  instances.push(instance)
  return instance
}

export function closeAllMessage() {
  instances.forEach((instance) => {
    instance.manualDestroy()
  })
}
