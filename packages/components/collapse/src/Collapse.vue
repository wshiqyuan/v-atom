<script lang="ts" setup>
import type { CollapseEmits, CollapseProps, NameType } from './types'
import { provide, ref, watch } from 'vue'
import { collapseContextKey } from './types'

defineOptions({
  name: 'VaCollapse',
})

const props = defineProps<CollapseProps>()

const emits = defineEmits<CollapseEmits>()

const activeNames = ref<NameType[]>(props.modelValue)

watch(() => props.modelValue, () => {
  activeNames.value = props.modelValue
})

if (props.accordion && activeNames.value.length > 1) {
  console.warn('[VaCollapse]: accordion mode only allows one active item at a time.')
}

function handleItemClick(item: NameType) {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  }
  else {
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      activeNames.value.splice(index, 1)
    }
    else {
      activeNames.value.push(item)
    }
  }
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>

<template>
  <div
    class="va-collapse"
  >
    <slot />
  </div>
</template>
