<script setup>
import { h, ref } from 'vue'

const test = ref('')
const options2 = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true },
]
function customRender(option) {
  return h('div', { className: 'xyz' }, [h('b', option.label), h('span', option.value)])
}
</script>

<template>
  <VaSelect v-model="test" placeholder="基础选择器，请选择" :options="options2" :render-label="customRender" />
</template>

<style>
.va-select__menu-item, .xyz  {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
