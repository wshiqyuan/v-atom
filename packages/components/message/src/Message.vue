<script lang="ts" setup>
import type { MessageProps } from './types'
import { useEventListener } from '@v-atom/hooks/index'
import { computed, onMounted, ref } from 'vue'
import RenderVnode from '../../common/RenderVnode'
import Icon from '../../icon/src/Icon.vue'

defineOptions({
  name: 'VaMessage',
})

const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: 'info',
  offset: 20,
  transitionName: 'fade-up',
})

const visible = ref(false)

const cssStyle = computed(() => ({
  marginTop: `${props.offset}px`,
  zIndex: props.zIndex,
}))

let timer: any
function startTimer() {
  if (props.duration === 0) {
    return
  }
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}

function clearTimer() {
  clearTimeout(timer)
}

onMounted(() => {
  visible.value = true
  startTimer()
})

function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}

useEventListener(document, 'keydown', keydown)

function destroyComponent() {
  props.onDestroy()
}

defineExpose({
  visible,
})
</script>

<template>
  <Transition
    :name="transitionName"
    @after-leave="destroyComponent"
  >
    <div
      v-show="visible"
      class="va-message"
      role="alert"
      :class="{
        [`va-message--${type}`]: type,
        'is-close': showClose,
      }"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="va-message__content">
        <slot>
          <RenderVnode
            v-if="message"
            :vnode="message"
          />
        </slot>
      </div>
      <div v-if="showClose" class="va-message__close">
        <Icon icon="xmark" @click.stop="visible = false" />
      </div>
    </div>
  </Transition>
</template>
