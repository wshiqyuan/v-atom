<script lang="ts" setup>
import type { SwitchEmits, SwitchProps } from './types'
import { computed, ref } from 'vue'

defineOptions({
  name: 'VaSwitch',
  inheritAttrs: false,
})

const props = defineProps<SwitchProps>()
const emits = defineEmits<SwitchEmits>()

const innerValue = ref(props.modelValue)
const checked = computed(() => innerValue.value)

function switchValue() {
  if (props.disabled)
    return
  innerValue.value = !innerValue.value
  emits('update:modelValue', innerValue.value)
  emits('change', innerValue.value)
}
</script>

<template>
  <div
    class="va-switch"
    :class="{
      [`va-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      class="va-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
    >
    <div class="va-switch__core">
      <div class="va-switch__core-action" />
    </div>
  </div>
</template>
