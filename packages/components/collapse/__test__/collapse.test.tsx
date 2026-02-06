import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Collapse from '../src/Collapse.vue'
import CollapseItem from '../src/CollapseItem.vue'

describe('collapse.vue', () => {
  it('basic collapse', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => (
      <Collapse modelValue={['a']} onChange={onChange}>
        <CollapseItem name="a" title="title a">
          content a
        </CollapseItem>
        <CollapseItem name="b" title="title b">
          content b
        </CollapseItem>
        <CollapseItem name="c" title="title c" disabled>
          content c
        </CollapseItem>
      </Collapse>
    ), {
      global: {
        stubs: ['VaIcon'],
      },
      attachTo: document.body,
    })
    const headers = wrapper.findAll('.va-collapse-item__header')
    const contents = wrapper.findAll('.va-collapse-item__wrapper')

    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // 文本
    const firstHeader = headers[0]
    expect(firstHeader.text()).toBe('title a')

    // 内容
    const firstContent = contents[0]
    const secondContent = contents[1]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')

    // 行为
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    const secondHeader = headers[1]
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])

    // disabled
    const disabledHeader = headers[2]
    const disabledContent = contents[2]
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
  })
})
