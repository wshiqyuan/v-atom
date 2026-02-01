<script lang="ts" setup>
import { ref } from 'vue'
import type { ButtonProps } from './type'

defineOptions({
  name: 'VaButton',
})

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
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
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <slot />
  </button>
</template>

<style scoped>

</style>
