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
    console.log(wrapper.html())
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

    await wrapper.setProps({ modelValue: 'pop update' })
    expect(input.element.value).toBe('pop update')
  })
})
