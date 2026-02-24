<script lang="ts" setup>
import type { SwitchEmits, SwitchProps } from './types'
import { computed, onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'VaSwitch',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
})
const emits = defineEmits<SwitchEmits>()

const innerValue = ref(props.modelValue)
const checked = computed(() => innerValue.value === props.activeValue)

function switchValue() {
  if (props.disabled)
    return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
}

const input = ref<HTMLInputElement>()

onMounted(() => {
  input.value!.checked = checked.value
})

watch(checked, (val) => {
  input.value!.checked = val
})

watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
})
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
      ref="input"
      class="va-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    >
    <div class="va-switch__core">
      <div class="va-switch__core-inner">
        <span v-if="activeText || inactiveText" class="va-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="va-switch__core-action" />
    </div>
  </div>
</template>
