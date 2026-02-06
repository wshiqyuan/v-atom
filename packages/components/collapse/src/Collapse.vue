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
  let _activeNames: NameType[] = [...activeNames.value]
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === item ? '' : item]
    activeNames.value = _activeNames
  }
  else {
    const index = _activeNames.indexOf(item)
    if (index > -1) {
      _activeNames.splice(index, 1)
    }
    else {
      _activeNames.push(item)
    }
    activeNames.value = _activeNames
  }
  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
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
