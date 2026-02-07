<script lang="ts" setup>
import type { Instance } from '@popperjs/core'
import type { TooltipEmits, TooltipProps } from './types'
import { createPopper } from '@popperjs/core'
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)

const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()

function toggleFloating() {
  isOpen.value = !isOpen.value
  emits('visibleChange', isOpen.value)
}

let popperInstance: Instance | null = null

watch(isOpen, (newValue) => {
  if (newValue) {
    if (popperNode.value && triggerNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, {
        placement: props.placement,
      })
    }
    else {
      popperInstance?.destroy()
    }
  }
}, {
  flush: 'post',
})
</script>

<template>
  <div class="va-tooltip">
    <div
      ref="triggerNode"
      class="va-tooltip__trigger"
      @click="toggleFloating"
    >
      <slot />
    </div>
    <div
      v-if="isOpen"
      ref="popperNode"
      class="va-tooltip__popper"
    >
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>
