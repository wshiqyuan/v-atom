import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Select from '../src/Select.vue'

async function openMenu(wrapper: ReturnType<typeof mount>) {
  await wrapper.trigger('click')
  await new Promise(r => setTimeout(r, 100))
  await wrapper.vm.$nextTick()
}

describe('select.vue', () => {
  const options = [
    { label: '选项1', value: 'option1' },
    { label: '选项2', value: 'option2' },
    { label: '选项3', value: 'option3' },
  ]

  it('renders correctly', () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: '请选择',
        disabled: false,
      },
    })

    expect(wrapper.find('.va-select').exists()).toBe(true)
    expect(wrapper.find('.va-input').exists()).toBe(true)
  })

  it('displays placeholder', () => {
    const placeholder = '请选择'
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder,
        disabled: false,
      },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder)
  })

  it('updates input value on modelValue change', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: '请选择',
        disabled: false,
      },
    })

    await wrapper.setProps({ modelValue: 'option1' })

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('选项1')
  })

  it('emits change event on selection', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: '请选择',
        disabled: false,
      },
    })

    await openMenu(wrapper)
    const item = wrapper.findAll('.va-select__menu-item')[0]
    if (item) {
      await item.trigger('click')
    }

    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual(['option1'])
  })

  it('shows clear icon when clearable and has value', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: 'option1',
        options,
        placeholder: '请选择',
        disabled: false,
        clearable: true,
      },
    })

    // 模拟鼠标悬停
    await wrapper.trigger('mouseenter')

    expect(wrapper.find('.va-input__clear').exists()).toBe(true)
  })

  it('emits update:modelValue on clear', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: 'option1',
        options,
        placeholder: '请选择',
        disabled: false,
        clearable: true,
      },
    })

    // 模拟鼠标悬停以显示清除图标
    await wrapper.trigger('mouseenter')

    // 点击清除图标
    const clearIcon = wrapper.find('.va-input__clear')
    await clearIcon.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
  })

  it('does not allow selection when disabled', async () => {
    const wrapper = mount(Select, {
      props: {
        modelValue: '',
        options,
        placeholder: '请选择',
        disabled: true,
      },
    })

    // 当组件禁用时，点击不应触发下拉框展开
    await wrapper.trigger('click')

    // 验证组件是否被禁用
    expect(wrapper.classes()).toContain('is-disabled')
  })
})
