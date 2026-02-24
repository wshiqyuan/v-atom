import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Form from '../src/Form.vue'

describe('form.vue', () => {
  it('render correctly', () => {
    const wrapper = mount(Form, {
      props: {
        model: {},
        rules: {},
      },
    })

    expect(wrapper.classes()).toContain('va-form')
  })

  it('expose validate method', async () => {
    const wrapper = mount(Form, {
      props: {
        model: { name: 'test' },
        rules: {},
      },
    })

    expect(typeof wrapper.vm.validate).toBe('function')
  })

  it('expose resetFields method', () => {
    const wrapper = mount(Form, {
      props: {
        model: { name: 'test' },
        rules: {},
      },
    })

    expect(typeof wrapper.vm.resetFields).toBe('function')
  })

  it('expose clearValidate method', () => {
    const wrapper = mount(Form, {
      props: {
        model: { name: 'test' },
        rules: {},
      },
    })

    expect(typeof wrapper.vm.clearValidate).toBe('function')
  })

  it('validate all fields', async () => {
    const wrapper = mount(Form, {
      props: {
        model: { name: 'test' },
        rules: {
          name: [{ required: true, message: 'Name is required' }],
        },
      },
    })

    const result = await wrapper.vm.validate()
    expect(result).toBe(true)
  })

  it('reset fields', () => {
    const wrapper = mount(Form, {
      props: {
        model: { name: 'test' },
        rules: {},
      },
    })

    expect(() => wrapper.vm.resetFields()).not.toThrow()
  })

  it('clears validation', () => {
    const wrapper = mount(Form, {
      props: {
        model: { name: 'test' },
        rules: {},
      },
    })

    expect(() => wrapper.vm.clearValidate()).not.toThrow()
  })
})
