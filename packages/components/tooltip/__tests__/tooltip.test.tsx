import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Tooltip from '../src/Tooltip.vue'

vi.mock('@popperjs/core')

const onVisibleChange = vi.fn()
describe('tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  it('basic tooltip', async () => {
    const wrapper = mount(() => (
      <Tooltip content="Hello tooltip" trigger="click" onVisibleChange={onVisibleChange}>
        <button id="trigger">Trigger</button>
      </Tooltip>
    ), {
      attachTo: document.body,
    })
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeFalsy()

    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.find('.va-tooltip__popper').text()).toBe('Hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)

    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenCalledWith(false)
  })
  it('outside click', async () => {
    const wrapper = mount(() => (
      <div>
        <div id="outside"></div>
        <Tooltip content="Hello tooltip" trigger="click" onVisibleChange={onVisibleChange}>
          <button id="trigger">Trigger</button>
        </Tooltip>
      </div>
    ), {
      attachTo: document.body,
    })

    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeFalsy()

    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeTruthy()

    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeFalsy()
  })
  it('hover trigger open and close', async () => {
    const wrapper = mount(() => (
      <Tooltip content="Hover tooltip" trigger="hover">
        <button id="trigger">Trigger</button>
      </Tooltip>
    ), {
      attachTo: document.body,
    })

    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeFalsy()

    wrapper.get('.va-tooltip__trigger').trigger('mouseenter')
    await vi.runAllTimers()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.find('.va-tooltip__popper').text()).toBe('Hover tooltip')

    wrapper.get('.va-tooltip').trigger('mouseleave')
    await vi.runAllTimers()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeFalsy()
  })

  it('manual prop prevents auto open', async () => {
    const wrapper = mount(() => (
      <Tooltip content="Manual tooltip" manual trigger="hover">
        <button id="trigger">Trigger</button>
      </Tooltip>
    ), {
      attachTo: document.body,
    })

    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()

    wrapper.get('.va-tooltip__trigger').trigger('mouseenter')
    await vi.runAllTimers()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeFalsy()
  })

  it('exposed show/hide methods work', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        content: 'expose',
      },
      slots: {
        default: '<button id="trigger">Trigger</button>',
      },
      attachTo: document.body,
    })

    wrapper.vm.show()
    await vi.runAllTimers()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeTruthy()

    wrapper.vm.hide()
    await vi.runAllTimers()
    expect(wrapper.find('.va-tooltip__popper').exists()).toBeFalsy()
  })

  it('content slot is rendered', async () => {
    const wrapper = mount(Tooltip, {
      props: {
        trigger: 'click',
      },
      slots: {
        default: '<button id="trigger">Trigger</button>',
        content: '<span id="slot-content">Custom content</span>',
      },
      attachTo: document.body,
    })

    const triggerArea = wrapper.get('#trigger')
    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('#slot-content').exists()).toBeTruthy()
    expect(wrapper.find('#slot-content').text()).toBe('Custom content')
  })
})
