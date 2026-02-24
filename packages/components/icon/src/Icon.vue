<script lang="ts" setup>
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'
import { computed } from 'vue'

defineOptions({
  name: 'VaIcon',
  inheritAttrs: false,
})

const props = defineProps<IconProps>()

const filteredProps = computed(() => omit(props, ['type', 'color']))

const customStyle = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<template>
  <i class="va-icon" :class="{ [`va-icon--${type}`]: type }" :style="customStyle" v-bind="$attrs">
    <FontAwesomeIcon v-bind="filteredProps" />
  </i>
</template>
