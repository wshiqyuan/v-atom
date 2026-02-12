<script lang="ts" setup>
import type { MessageProps } from './types'
import { computed, onMounted, ref, watch } from 'vue'
import RenderVnode from '../../common/RenderVnode'
import Icon from '../../icon/src/Icon.vue'

defineOptions({
  name: 'VaMessage',
})

const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: 'info',
  offset: 20,
})

const visible = ref(false)

const cssStyle = computed(() => ({
  marginTop: `${props.offset}px`,
}))

function startTimer() {
  if (props.duration === 0) {
    return
  }
  setTimeout(() => {
    visible.value = false
  }, props.duration)
}

onMounted(() => {
  visible.value = true
  startTimer()
})

watch(visible, (newValue) => {
  if (!newValue && props.onDestroy) {
    props.onDestroy()
  }
})
</script>

<template>
  <div
    v-show="visible"
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
  position: relative;
  border: 1px solid blue;
}
</style>
