<script lang="ts" setup>
import type { InputEmits, InputProps } from './types'
import { ref, watch } from 'vue'

defineOptions({
  name: 'VaInput',
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
})

const emit = defineEmits<InputEmits>()

const innerValue = ref(props.modelValue)

function handleInput() {
  emit('update:modelValue', innerValue.value)
}

watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
})
</script>

<template>
  <div
    class="va-input"
    :class="{
      [`va-input--${type}`]: type,
      [`va-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="va-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="va-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="va-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          v-model="innerValue"
          class="va-input__inner"
          :type="type"
          :disabled="disabled"
          @input="handleInput"
        >
        <!-- suffix slot -->
        <span v-if="$slots.suffix" class="va-input__suffix">
          <slot name="suffix" />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="va-input__append">
        <slot name="append" />
      </div>
    </template>
    <template v-else>
      <textarea
        v-model="innerValue"
        class="va-textarea__wrapper"
        :disabled="disabled"
        @input="handleInput"
      />
    </template>
  </div>
</template>
