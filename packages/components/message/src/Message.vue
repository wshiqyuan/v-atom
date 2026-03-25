<script setup lang="ts">
import type { MessageProps } from './types'
import { useEventListener } from '@v-atom/hooks/index'
import { computed, onMounted, ref } from 'vue'
import RenderVnode from '../../common/RenderVnode'
import Icon from '../../icon/src/Icon.vue'
import { getLastBottomOffset } from './method'

defineOptions({
  name: 'VaMessage',
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up',
})
const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const height = ref(0)
const lastOffset = computed(() => getLastBottomOffset(props.id))
const topOffset = computed(() => props.offset + lastOffset.value)
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: `${topOffset.value}px`,
  zIndex: props.zIndex,
}))
let timer: any
function startTimer() {
  if (props.duration === 0)
    return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}
onMounted(async () => {
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
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
  bottomOffset,
  visible,
})
</script>

<template>
  <Transition
    :name="transitionName"
    @after-leave="destroyComponent"
    @enter="updateHeight"
  >
    <div
      v-show="visible"
      ref="messageRef"
      class="va-message"
      :class="{
        [`va-message--${type}`]: type,
        'is-close': showClose,
      }"
      role="alert"
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
