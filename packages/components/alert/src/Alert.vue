<script lang="ts" setup>
import type { AlertEmits, AlertInstance, AlertProps } from './types'
import { ref } from 'vue'
import { Icon } from '../../icon'

defineOptions({
  name: 'VaAlert',
})

withDefaults(defineProps<AlertProps>(), {
  effect: 'dark',
  closable: true,
})

const emits = defineEmits<AlertEmits>()

const visible = ref(true)

function hideAlert() {
  visible.value = false
  emits('close')
}

defineExpose<AlertInstance>({
  hide: () => hideAlert(),
})
</script>

<template>
  <Transition name="va-alert-fade">
    <div
      v-if="visible"
      class="va-alert"
      :class="{
        [`va-alert__${type}`]: type,
        [`va-alert__${effect}`]: effect,
      }"
    >
      <div class="va-alert__content">
        <div v-if="title" class="va-alert__header">
          <span>
            <slot name="title">
              {{ title }}
            </slot>
          </span>
        </div>
        <span>
          <slot>
            {{ content }}
          </slot>
        </span>
      </div>
      <div v-if="closable" class="va-alert__close">
        <Icon icon="xmark" @click.stop="visible = false" />
      </div>
    </div>
  </Transition>
</template>
