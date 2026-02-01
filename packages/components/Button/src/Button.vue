<script lang="ts" setup>
import type { ButtonProps } from './type'

defineOptions({
  name: 'VaButton',
})

defineProps<ButtonProps>()
</script>

<template>
  <button
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
  >
    <slot />
  </button>
</template>

<style scoped>

</style>
