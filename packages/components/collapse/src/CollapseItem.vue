<script lang="ts" setup>
import type { CollapseItemProps } from './types'
import { computed, inject } from 'vue'
import { Icon } from '../../icon'
import { collapseContextKey } from './types'

defineOptions({
  name: 'VaCollapseItem',
})

const props = defineProps<CollapseItemProps>()

const collapseContext = inject(collapseContextKey)

const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))

function handleClick() {
  if (props.disabled) {
    return
  }
  collapseContext?.handleItemClick(props.name)
}

const transtionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
}
</script>

<template>
  <div
    class="va-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      :id="`item-header-${name}`"
      class="va-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      @click="handleClick"
    >
      <slot name="title">
        {{ title }}
      </slot>
      <Icon icon="angle-right" class="header-angle" />
    </div>
    <Transition name="slide" v-on="transtionEvents">
      <div v-show="isActive" class="va-collapse-item__wrapper">
        <div :id="`item-content-${name}`" class="va-collapse-item__content">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
