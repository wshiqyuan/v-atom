<script lang="ts" setup>
import type { Slots } from 'vue'
import type { AlertEmits, AlertInstance, AlertProps } from './types'
import { ref, useSlots } from 'vue'
import Icon from '../../icon/src/Icon.vue'
import { IconTypeMap } from './types'

defineOptions({
  name: 'VaAlert',
})

withDefaults(defineProps<AlertProps>(), {
  effect: 'dark',
  closable: true,
  showIcon: false,
  type: 'primary',
})

const emits = defineEmits<AlertEmits>()
const slots: Slots = useSlots()

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
      <div v-if="showIcon" class="va-alert__icon">
        <Icon :icon="IconTypeMap[type]" />
      </div>
      <div class="va-alert__content">
        <span v-if="!!(slots.title || title)" class="va-alert__content__header">
          <slot name="title">
            {{ title }}
          </slot>
        </span>
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
