import { afterEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'
import { createMessage } from '../src/method'

vi.mock('@fortawesome/vue-fontawesome', () => ({
  FontAwesomeIcon: {
    name: 'FontAwesomeIcon',
    props: ['icon'],
    template: '<span />',
  },
}))

function cleanup() {
  const container = document.querySelector('.va-message-container')
  if (container && container.parentNode)
    container.parentNode.removeChild(container)
}

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('message.method', () => {
  it('creates and shows message', () => {
    const instance: any = createMessage({ message: 'hello' })
    const container = document.querySelector('.va-message-container')
    expect(instance).toBeTruthy()
    expect(container).toBeTruthy()
    expect(container!.textContent).toContain('hello')
    instance.props.onDestroy()
  })

  it('auto-destroy', async () => {
    vi.useFakeTimers()
    const instance: any = createMessage({ message: 'auto', duration: 100 })
    expect(instance).toBeTruthy()
    await nextTick()
    vi.advanceTimersByTime(150)
    await nextTick()
    expect(instance.vm.exposed!.visible.value).toBe(false)
    instance.props.onDestroy()
    vi.useRealTimers()
  })

  it('duration=0 means never auto-destroy', async () => {
    vi.useFakeTimers()
    const instance: any = createMessage({ message: 'persist', duration: 0 })
    expect(instance).toBeTruthy()
    await nextTick()
    vi.advanceTimersByTime(10000)
    await nextTick()
    expect(instance.vm.exposed!.visible.value).toBe(true)
    instance.props.onDestroy()
    vi.useRealTimers()
  })

  it('manualDestroy hides message', async () => {
    const instance: any = createMessage({ message: 'hide me' })
    expect(instance).toBeTruthy()

    instance.manualDestroy()
    expect(instance.vm.exposed!.visible.value).toBe(false)

    const inst2: any = createMessage({ message: 'with-close', showClose: true })
    await nextTick()
    const closeEl = document.querySelector('.va-message__close') as HTMLElement | null
    if (closeEl) {
      const target = closeEl.firstElementChild || closeEl
      target.dispatchEvent(new MouseEvent('click', { bubbles: true }))
      await nextTick()
      expect(inst2.vm.exposed!.visible.value).toBe(false)
    }
    inst2.props.onDestroy()
  })

  it('multiple instances stack with increasing zIndex', () => {
    const a: any = createMessage({ message: 'a' })
    const b: any = createMessage({ message: 'b' })
    expect(a.props.zIndex).toBeDefined()
    expect(b.props.zIndex).toBeDefined()
    expect(typeof a.props.zIndex).toBe('number')
    expect(b.props.zIndex).toBeGreaterThan(a.props.zIndex)
    a.props.onDestroy()
    b.props.onDestroy()
  })

  it('renders VNode messages', () => {
    const vnode = h('strong', 'VNodeContent')
    const instance: any = createMessage({ message: vnode })
    const container = document.querySelector('.va-message-container')
    expect(container).toBeTruthy()
    expect(container!.textContent).toContain('VNodeContent')
    instance.props.onDestroy()
  })

  it('escape key hides message', async () => {
    const instance: any = createMessage({ message: 'esc' })
    await nextTick()
    const ev = new KeyboardEvent('keydown', { code: 'Escape' })
    document.dispatchEvent(ev)
    await nextTick()
    expect(instance.vm.exposed!.visible.value).toBe(false)
    instance.props.onDestroy()
  })
})
