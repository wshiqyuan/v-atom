<script lang="ts" setup>
import type { FormProps } from './types'
import { provide } from 'vue'
import { formContextKey } from './types'

defineOptions({
  name: 'VaSelect',
})

const props = defineProps<FormProps>()

provide(formContextKey, props)
</script>

<template>
  <form class="va-form">
    <slot />
  </form>
</template>
