<script lang="ts" setup>
import type { FormContext, FormItemContext, FormProps } from './types'
import { provide } from 'vue'
import { formContextKey } from './types'

defineOptions({
  name: 'VaSelect',
})

const props = defineProps<FormProps>()

const fields: FormItemContext[] = []

const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}

const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    fields.slice(fields.indexOf(field), 1)
  }
}

provide(formContextKey, {
  ...props,
  addField,
  removeField,
})
</script>

<template>
  <form class="va-form">
    <slot />
  </form>
</template>
