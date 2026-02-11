<script lang="ts" setup>
import type { MessageProps } from './types'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import RenderVnode from '../../common/RenderVnode'
import Icon from '../../icon/src/Icon.vue'
import { getLastBottomOffset } from './method'

defineOptions({
  name: 'VaMessage',
})

const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: 'info',
  offset: 20,
})

const visible = ref(false)

const messageRef = ref<HTMLDivElement>()

const height = ref(0)
const lastOffset = computed(() => getLastBottomOffset(props.id))
const topOffset = computed(() => props.offset + lastOffset.value)
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: `${topOffset.value}px`,
}))

function startTimer() {
  if (props.duration === 0) {
    return
  }
  setTimeout(() => {
    visible.value = false
  }, props.duration)
}

onMounted(async () => {
  visible.value = true
  startTimer()
  await nextTick()
  height.value = messageRef.value!.getBoundingClientRect().height
})

watch(visible, (newValue) => {
  if (!newValue && props.onDestory) {
    props.onDestory()
  }
})

defineExpose({
  bottomOffset,
})
</script>

<template>
  <div
    v-show="visible"
    ref="messageRef"
    class="va-message"
    role="alert"
    :class="{
      [`va-message--${type}`]: type,
      'is-close': showClose,
    }"
    :style="cssStyle"
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
      <Icon icon="xmark" />
    </div>
  </div>
</template>

<style>
.va-message {
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 1px solid blue;
}
</style>
