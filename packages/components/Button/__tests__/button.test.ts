import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest'
import Button from '../src/Button.vue'

describe('button.vue', () => {
  it('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
      },
      slots: {
        default: 'button',
      },
    })
    console.log(wrapper.html())
  })
})
