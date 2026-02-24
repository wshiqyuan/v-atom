<script lang="ts" setup>
import type { FormItemContext, FormItemInstance, FormItemProps, FormValidateFailure, ValidateStatusProp } from './types'
import Schema from 'async-validator'
import { isNil } from 'lodash-es'
import { computed, inject, onMounted, onUnmounted, provide, reactive } from 'vue'
import { formContextKey, formItemContextKey } from './types'

defineOptions({
  name: 'VaFormItem',
})

const props = defineProps<FormItemProps>()

const formContext = inject(formContextKey)

let initialValue: Record<string, any>

const validateStatus: ValidateStatusProp = reactive({
  state: 'init',
  errorMsg: '',
  loading: false,
})

const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  }
  else {
    return null
  }
})

const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  }
  else {
    return []
  }
})

function getTriggerRules(trigger?: string) {
  const rules = itemRules.value
  if (!rules) {
    return []
  }
  return rules.filter((rule) => {
    if (!rule.trigger || !trigger)
      return true
    return rule.trigger && rule.trigger === trigger
  })
}

const isRequired = computed(() => {
  return itemRules.value.some(rule => rule.required)
})

async function validate(trigger?: string) {
  const modelName = props.prop
  const triggeredRules = getTriggerRules(trigger)
  if (triggeredRules.length === 0) {
    return true
  }
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules,
    })
    validateStatus.loading = true
    return validator.validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = 'success'
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e
        validateStatus.state = 'error'
        validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || '' : ''
        return Promise.reject(e)
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}

function clearValidate() {
  validateStatus.state = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}

function resetField() {
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue
  }
}

const context: FormItemContext = {
  prop: props.prop || '',
  validate,
  clearValidate,
  resetField,
}

provide(formItemContextKey, context)

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initialValue = innerValue.value
  }
})

onUnmounted(() => {
  formContext?.removeField(context)
})

defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  resetField,
  clearValidate,
})
</script>

<template>
  <div
    class="va-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired,
    }"
  >
    <label class="va-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="va-form-item__content">
      <slot :validate="validate" />
      <div
        v-if="validateStatus.state === 'error'"
        class="va-form-item__error-msg"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>
