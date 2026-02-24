import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Switch from '../src/Switch.vue'

describe('switch', () => {
  it('basic switch', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
      },
    })
    expect(wrapper.classes()).toContain('va-switch')
    expect(wrapper.attributes('role')).toBeUndefined()
  })

  it('checked when modelValue equals activeValue', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        activeValue: true,
        inactiveValue: false,
      },
    })

    expect(wrapper.classes()).toContain('is-checked')
  })

  it('unchecked when modelValue equals inactiveValue', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        activeValue: true,
        inactiveValue: false,
      },
    })

    expect(wrapper.classes()).not.toContain('is-checked')
  })

  it('toggles value on click', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        activeValue: true,
        inactiveValue: false,
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])

    await wrapper.setProps({ modelValue: true })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
    expect(wrapper.emitted('update:modelValue')![1]).toEqual([false])
  })

  it('do not toggle when disabled', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true,
        activeValue: true,
        inactiveValue: false,
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('emits change event when toggled', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        activeValue: true,
        inactiveValue: false,
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('change')![0]).toEqual([true])
  })

  it('renders text when provided', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        activeValue: true,
        inactiveValue: false,
        activeText: 'ON',
        inactiveText: 'OFF',
      },
    })

    expect(wrapper.find('.va-switch__core-inner-text').text()).toBe('ON')

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.find('.va-switch__core-inner-text').text()).toBe('OFF')
  })

  it('has proper CSS classes', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        size: 'large',
        disabled: true,
        activeValue: true,
        inactiveValue: false,
      },
    })

    expect(wrapper.classes()).toContain('va-switch--large')
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.classes()).toContain('is-checked')
  })

  it('handles different value types', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: 'yes',
        activeValue: 'yes',
        inactiveValue: 'no',
      },
    })

    expect(wrapper.classes()).toContain('is-checked')

    await wrapper.setProps({ modelValue: 'no' })
    expect(wrapper.classes()).not.toContain('is-checked')
  })

  it('triggers keyboard events', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        activeValue: true,
        inactiveValue: false,
      },
    })

    const input = wrapper.find('input')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })
})
