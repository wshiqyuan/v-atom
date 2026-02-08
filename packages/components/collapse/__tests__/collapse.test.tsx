import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import Collapse from '../src/Collapse.vue'
import CollapseItem from '../src/CollapseItem.vue'

let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstHeader: DOMWrapper<Element>, firstContent: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>, secondContent: DOMWrapper<Element>,
  disabledHeader: DOMWrapper<Element>, disabledContent: DOMWrapper<Element>

const onChange = vi.fn()

describe('collapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(() => (
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
    headers = wrapper.findAll('.va-collapse-item__header')
    contents = wrapper.findAll('.va-collapse-item__wrapper')

    firstHeader = headers[0]
    firstContent = contents[0]
    secondHeader = headers[1]
    secondContent = contents[1]
    disabledHeader = headers[2]
    disabledContent = contents[2]
  })
  it('test basic structure and content', () => {
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    expect(firstHeader.text()).toBe('title a')

    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
  })
  it('open/close by clicking header', async () => {
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
  })
  it('emit correct event', () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })
  it('disabled', async () => {
    onChange.mockClear()
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
  })
})

describe('collapse.vue accordion', () => {
  beforeAll(() => {
    wrapper = mount(() => (
      <Collapse accordion modelValue={['a']} onChange={onChange}>
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
    headers = wrapper.findAll('.va-collapse-item__header')
    contents = wrapper.findAll('.va-collapse-item__wrapper')

    firstHeader = headers[0]
    firstContent = contents[0]
    secondHeader = headers[1]
    secondContent = contents[1]
    disabledHeader = headers[2]
    disabledContent = contents[2]
  })
  it('initial state test', () => {
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(contents.filter(content => content.isVisible()).length).toBe(1)
  })
  it('behavior test - only one content block is shown at most', async () => {
    await secondHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    expect(secondContent.isVisible()).toBeTruthy()
    expect(contents.filter(content => content.isVisible()).length).toBe(1)
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(contents.filter(content => content.isVisible()).length).toBe(1)
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(contents.filter(content => content.isVisible()).length).toBe(0)
  })
  it('emit correct event', async () => {
    onChange.mockClear()
    await secondHeader.trigger('click')
    await firstHeader.trigger('click')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(['b'])
    expect(onChange).toHaveBeenLastCalledWith(['a'])
  })
})
