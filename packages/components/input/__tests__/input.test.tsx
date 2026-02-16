import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from '../src/Input.vue'

describe('input.vue', () => {
  it('basic input', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        size: 'small',
        type: 'text',
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix',
      },
    })
    // classes
    expect(wrapper.classes()).toContain('va-input--small')
    expect(wrapper.classes()).toContain('va-input--text')
    expect(wrapper.classes()).toContain('is-prepend')
    expect(wrapper.classes()).toContain('is-prefix')
    // should render input
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.find('input').attributes('type')).toBe('text')
    // slots
    expect(wrapper.find('.va-input__prepend').exists()).toBeTruthy()
    expect(wrapper.find('.va-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.va-input__prefix').exists()).toBeTruthy()
    expect(wrapper.find('.va-input__prefix').text()).toBe('prefix')

    // textarea
    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: '',
      },
    })

    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })
  it('v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: 'test',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
      },
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('test')

    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')

    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual(['update'])
    expect(changeEvent![0]).toEqual(['update'])

    await wrapper.setProps({ modelValue: 'pop update' })
    expect(input.element.value).toBe('pop update')
  })
  it('click to clear string', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: 'test',
        clearable: true,
      },
      global: {
        stubs: ['VaIcon'],
      },
    })
    expect(wrapper.find('.va-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')

    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
    expect(wrapper.find('.va-input__clear').exists()).toBeTruthy()

    await wrapper.get('.va-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })
  it('show password', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        type: 'text',
        showPassword: true,
      },
      global: {
        stubs: ['VaIcon'],
      },
    })
    expect(wrapper.find('.va-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')

    await input.setValue('123')
    const eyeIcon = wrapper.find('.va-input__password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')

    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.va-input__password').attributes('icon')).toBe('eye')
  })
})
