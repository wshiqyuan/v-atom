<script lang="ts" setup>
import type { Ref } from 'vue'
import type { InputEmits, InputProps } from './types'
import { computed, inject, nextTick, ref, useAttrs, watch } from 'vue'
import { formItemContextKey } from '../../form/src/types'
import Icon from '../../icon/src/Icon.vue'

defineOptions({
  name: 'VaInput',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off',
})

const emits = defineEmits<InputEmits>()

const attrs = useAttrs()

const inputRef = ref() as Ref<HTMLInputElement>

const isFocus = ref(false)

const innerValue = ref(props.modelValue)

const formItemContext = inject(formItemContextKey)

function runValidation(trigger?: string) {
  formItemContext?.validate(trigger).catch(e => console.log(e.errors))
}

const showClear = computed(() =>
  props.clearable
  && !props.disabled
  && !!innerValue.value
  && isFocus.value,
)

async function keepFocus() {
  await nextTick()
  inputRef.value.focus()
}

function handleInput() {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
  runValidation('input')
}

function handleChange() {
  emits('change', innerValue.value)
  runValidation('change')
}

function handleFocus(event: FocusEvent) {
  isFocus.value = true
  emits('focus', event)
}

function handleBlur(event: FocusEvent) {
  isFocus.value = false
  emits('blur', event)
  runValidation('blur')
}

function NOOP() {}

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

defineExpose({
  ref: inputRef,
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
          v-bind="attrs"
          ref="inputRef"
          v-model="innerValue"
          class="va-input__inner"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="va-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix" />
          <Icon
            v-if="showClear"
            icon="circle-xmark"
            class="va-input__clear"
            @click="clear"
            @mousedown.prevent="NOOP"
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
      <!-- textarea -->
      <textarea
        v-bind="attrs"
        ref="inputRef"
        v-model="innerValue"
        class="va-textarea__wrapper"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
    </template>
  </div>
</template>
