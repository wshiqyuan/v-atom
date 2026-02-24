<script lang="ts" setup>
import type { ButtonProps } from './types'
import { ref } from 'vue'
import Icon from '../../icon/src/Icon.vue'

defineOptions({
  name: 'VaButton',
})

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref,
})
</script>

<template>
  <button
    ref="_ref"
    class="va-button"
    :class="{
      [`va-button--${type}`]: type,
      [`va-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon v-if="loading" icon="spinner" spin />
    <Icon v-if="icon" :icon="icon" />
    <span>
      <slot />
    </span>
  </button>
</template>
