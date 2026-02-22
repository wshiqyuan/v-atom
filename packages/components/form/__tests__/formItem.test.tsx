import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormItem from '../src/FormItem.vue'
import { formContextKey } from '../src/types'

const mockFormContext = {
  model: { name: 'test' },
  rules: {
    name: [{ required: true, message: 'Name is required' }],
  },
  addField: () => {},
  removeField: () => {},
}

describe('formItem.vue', () => {
  it('render correctly', () => {
    const wrapper = mount(FormItem, {
      props: {
        label: 'Test Label',
        prop: 'name',
      },
      global: {
        provide: {
          [formContextKey]: mockFormContext,
        },
      },
    })

    expect(wrapper.classes()).toContain('va-form-item')
    expect(wrapper.find('.va-form-item__label').text()).toBe('Test Label')
  })

  it('display custom label slot', () => {
    const wrapper = mount(FormItem, {
      props: {
        label: 'Default Label',
        prop: 'name',
      },
      slots: {
        label: '<span>Custom Label</span>',
      },
      global: {
        provide: {
          [formContextKey]: mockFormContext,
        },
      },
    })

    expect(wrapper.find('.va-form-item__label span').text()).toBe('Custom Label')
  })

  it('show error when validation fails', async () => {
    const wrapper = mount(FormItem, {
      props: {
        label: 'Name',
        prop: 'name',
      },
      global: {
        provide: {
          [formContextKey]: {
            ...mockFormContext,
            model: { name: '' },
          },
        },
      },
    })

    try {
      await wrapper.vm.validate()
    }
    catch (error) {
      expect(error).toBeInstanceOf(Error)
    }

    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('is-error')
  })

  it('show success when validation passes', async () => {
    const wrapper = mount(FormItem, {
      props: {
        label: 'Name',
        prop: 'name',
      },
      global: {
        provide: {
          [formContextKey]: {
            ...mockFormContext,
            model: { name: 'John' },
          },
        },
      },
    })

    await wrapper.vm.validate()

    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('is-success')
  })

  it('show required indicator', () => {
    const wrapper = mount(FormItem, {
      props: {
        label: 'Name',
        prop: 'name',
      },
      global: {
        provide: {
          [formContextKey]: {
            ...mockFormContext,
            rules: {
              name: [{ required: true, message: 'Name is required' }],
            },
          },
        },
      },
    })

    expect(wrapper.classes()).toContain('is-required')
  })

  it('expose validateStatus', () => {
    const wrapper = mount(FormItem, {
      props: {
        label: 'Name',
        prop: 'name',
      },
      global: {
        provide: {
          [formContextKey]: mockFormContext,
        },
      },
    })

    expect(wrapper.vm.validateStatus).toBeDefined()
    expect(typeof wrapper.vm.validateStatus).toBe('object')
  })

  it('expose validate method', () => {
    const wrapper = mount(FormItem, {
      props: {
        label: 'Name',
        prop: 'name',
      },
      global: {
        provide: {
          [formContextKey]: mockFormContext,
        },
      },
    })

    expect(typeof wrapper.vm.validate).toBe('function')
  })

  it('expose resetField method', () => {
    const wrapper = mount(FormItem, {
      props: {
        label: 'Name',
        prop: 'name',
      },
      global: {
        provide: {
          [formContextKey]: mockFormContext,
        },
      },
    })

    expect(typeof wrapper.vm.resetField).toBe('function')
  })

  it('expose clearValidate method', () => {
    const wrapper = mount(FormItem, {
      props: {
        label: 'Name',
        prop: 'name',
      },
      global: {
        provide: {
          [formContextKey]: mockFormContext,
        },
      },
    })

    expect(typeof wrapper.vm.clearValidate).toBe('function')
  })
})
