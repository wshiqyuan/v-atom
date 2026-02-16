<script lang="ts" setup>
import type { InputEmits, InputProps } from './types'
import { computed, ref, watch } from 'vue'
import { Icon } from '../../icon'

defineOptions({
  name: 'VaInput',
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
})

const emits = defineEmits<InputEmits>()

const isFocus = ref(false)

const innerValue = ref(props.modelValue)

const showClear = computed(() =>
  props.clearable
  && !props.disabled
  && !!innerValue.value
  && isFocus.value,
)

function handleInput() {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}

function handleChange() {
  emits('change', innerValue.value)
}

function handleFocus(event: FocusEvent) {
  isFocus.value = true
  emits('focus', event)
}

function handleBlur(event: FocusEvent) {
  isFocus.value = false
  emits('blur', event)
}

function clear() {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('input', '')
  emits('change', '')
}

watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
})

const passwordVisible = ref(false)

const showPasswordArea = computed(() =>
  props.showPassword
  && !props.disabled
  && !!innerValue.value,
)

function togglePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
}
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
      'is-focus': isFocus,
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
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
        <!-- suffix slot -->
        <span v-if="$slots.suffix || showClear || showPasswordArea" class="va-input__suffix">
          <slot name="suffix" />
          <Icon
            v-if="showClear"
            icon="circle-xmark"
            class="va-input__clear"
            @click="clear"
          />
          <Icon
            v-if="showPasswordArea && passwordVisible"
            icon="eye"
            class="va-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            v-if="showPasswordArea && !passwordVisible"
            icon="eye-slash"
            class="va-input__password"
            @click="togglePasswordVisible"
          />
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
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
    </template>
  </div>
</template>
