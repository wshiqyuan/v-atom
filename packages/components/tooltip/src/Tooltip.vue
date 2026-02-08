<script lang="ts" setup>
import type { Instance } from '@popperjs/core'
import type { TooltipEmits, TooltipProps } from './types'
import { createPopper } from '@popperjs/core'
import { useClickOutside } from '@v-atom/hooks/index'
import { reactive, ref, watch } from 'vue'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)

const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()

function toggleFloating() {
  isOpen.value = !isOpen.value
  emits('visibleChange', isOpen.value)
}

let popperInstance: Instance | null = null

let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

function open() {
  isOpen.value = true
  emits('visibleChange', true)
}

function close() {
  isOpen.value = false
  emits('visibleChange', false)
}

useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value) {
    close()
  }
})

function activeEvents() {
  if (props.trigger === 'hover') {
    events.mouseenter = open
    outerEvents.mouseleave = close
  }
  else if (props.trigger === 'click') {
    events.click = toggleFloating
  }
}

activeEvents()

watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if (newTrigger !== oldTrigger) {
    events = {}
    outerEvents = {}
    activeEvents()
  }
})

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
  <div
    ref="popperContainerNode"
    class="va-tooltip"
    v-on="outerEvents"
  >
    <div
      ref="triggerNode"
      class="va-tooltip__trigger"
      v-on="events"
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
