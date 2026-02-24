<script lang="ts" setup>
import type { ValidateFieldsError } from 'async-validator'
import type { FormContext, FormInstance, FormItemContext, FormProps, FormValidateFailure } from './types'
import { provide } from 'vue'
import { formContextKey } from './types'

defineOptions({
  name: 'VaForm',
})

const props = defineProps<FormProps>()

const fields: FormItemContext[] = []

const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}

const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1)
  }
}

async function validate() {
  let validationErrors: ValidateFieldsError = {}
  for (const field of fields) {
    try {
      await field.validate('')
    }
    catch (e) {
      const error = e as FormValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields,
      }
    }
  }
  if (Object.keys(validationErrors).length === 0)
    return true
  return Promise.reject(validationErrors)
}

function resetFields(keys: string[] = []) {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.resetField())
}

function clearValidate(keys: string[] = []) {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.clearValidate())
}

provide(formContextKey, {
  ...props,
  addField,
  removeField,
})

defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate,
})
</script>

<template>
  <form class="va-form">
    <slot />
  </form>
</template>
