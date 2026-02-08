import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import Alert from '../src/Alert.vue'

const TEST = 'alert test content'

describe('alert.vue', () => {
  it('render test & class', () => {
    const wrapper = mount(() => <Alert content={TEST} />)
    expect(wrapper.find('.va-alert__content').text()).toEqual(TEST)
    expect(wrapper.find('.va-alert').classes()).toContain('va-alert__primary')
  })

  it('type', () => {
    const wrapper = mount(() => (
      <Alert content="test" showIcon={true} type="success" />
    ))
    expect(wrapper.find('.va-alert').classes()).toContain('va-alert__success')
    expect(wrapper.find('.va-alert__icon').exists()).toBe(true)
  })

  it('title prop', () => {
    const wrapper = mount(() => (
      <Alert title="Test Title" content={TEST} showIcon={true} />
    ))
    expect(wrapper.find('.va-alert__content__header').text()).toEqual('Test Title')
  })

  it('effect', () => {
    const wrapper = mount(() => <Alert content="test" effect="light" type="primary" />)
    expect(wrapper.find('.va-alert').classes()).toContain('va-alert__light')
  })

  it('title slot', () => {
    const wrapper = mount(Alert, {
      props: {
        type: 'primary',
        content: 'Test content',
      },
      slots: {
        title: TEST,
      },
      global: {
        stubs: ['VaIcon'],
      },
    })
    expect(wrapper.find('.va-alert__content__header').text()).toEqual(TEST)
  })

  it('default slot', () => {
    const wrapper = mount(Alert, {
      props: {
        type: 'primary',
        content: 'This will be overridden',
      },
      slots: {
        default: TEST,
      },
      global: {
        stubs: ['VaIcon'],
      },
    })
    expect(wrapper.find('.va-alert__content').text()).toEqual(TEST)
  })

  it('close', async () => {
    const wrapper = mount(() => <Alert content="Closable alert" closable={true} />, {
      global: {
        stubs: ['VaIcon'],
      },
    })
    const closeWrapper = wrapper.find('.va-alert__close')
    expect(closeWrapper.exists()).toBe(true)

    const iconStub = wrapper.findComponent({ name: 'VaIcon' })
    await iconStub.trigger('click')
    await nextTick()

    expect(wrapper.find('.va-alert').exists()).toBe(false)
  })

  it('no close button when closable is false', () => {
    const wrapper = mount(() => <Alert content="Unclosable alert" closable={false} />)
    expect(wrapper.find('.va-alert__close').exists()).toBe(false)
  })

  it('showIcon displays icon', () => {
    const wrapper = mount(() => <Alert content="With icon" showIcon={true} type="success" />)
    expect(wrapper.find('.va-alert__icon').exists()).toBe(true)
  })

  it('emits close when hide() called', async () => {
    const wrapper = mount(Alert, {
      props: { content: 'Closable alert' },
    })

    expect(wrapper.find('.va-alert').exists()).toBe(true)

    ;(wrapper.vm as any).hide()
    await nextTick()

    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.find('.va-alert').exists()).toBe(false)
  })
})
