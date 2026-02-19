<script lang="ts" setup>
import type { Instance } from '@popperjs/core'
import type { TooltipEmits, TooltipInstance, TooltipProps } from './types'
import { createPopper } from '@popperjs/core'
import { useClickOutside } from '@v-atom/hooks/index'
import { debounce } from 'lodash-es'
import { computed, onUnmounted, reactive, ref, watch } from 'vue'

defineOptions({
  name: 'VaTooltip',
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transtion: 'fade',
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)

const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()

let popperInstance: Instance | null = null

let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      },
    ],
    ...props.popperOptions,
  }
})

function open() {
  isOpen.value = true
  emits('visibleChange', true)
}

function close() {
  isOpen.value = false
  emits('visibleChange', false)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

function openPopper() {
  closeDebounce.cancel()
  openDebounce()
}

function closePopper() {
  openDebounce.cancel()
  closeDebounce()
}

function togglePopper() {
  if (isOpen.value) {
    closePopper()
  }
  else {
    openPopper()
  }
}

useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closePopper()
  }
  if (isOpen.value) {
    emits('clickOutside', true)
  }
})

function activeEvents() {
  if (props.trigger === 'hover') {
    events.mouseenter = openPopper
    outerEvents.mouseleave = closePopper
  }
  else if (props.trigger === 'click') {
    events.click = togglePopper
  }
}

if (!props.manual) {
  activeEvents()
}

watch(() => props.manual, (isManual) => {
  if (isManual) {
    events = {}
    outerEvents = {}
  }
  else {
    activeEvents()
  }
})

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
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    }
    else {
      popperInstance?.destroy()
    }
  }
}, {
  flush: 'post',
})

onUnmounted(() => {
  popperInstance?.destroy()
})

defineExpose<TooltipInstance>({
  show: openPopper,
  hide: closePopper,
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
    <Transition :name="transtion">
      <div
        v-if="isOpen"
        ref="popperNode"
        class="va-tooltip__popper"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow />
      </div>
    </Transition>
  </div>
</template>
