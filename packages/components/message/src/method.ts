import type { CreateMessageProps, MessageContext } from './types'
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
  const id = `message_${seed++}`

  const dom = createBox()

  const destroy = () => {
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1)
      return
    instances.splice(idx, 1)
    render(null, dom)
    if (dom.parentNode)
      dom.parentNode.removeChild(dom)

    if (injectContainer && instances.length === 0) {
      document.body.removeChild(injectContainer)
    }
  }

  const newProps = {
    ...props,
    id,
    onDestroy: destroy,
  }

  const vnode = h(MessageConstructor, newProps)
  render(vnode, dom)

  if (injectContainer && !injectContainer.parentNode) {
    document.body.appendChild(injectContainer)
  }

  const vm = vnode.component!

  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
  }
  instances.push(instance)
  return instance
}
