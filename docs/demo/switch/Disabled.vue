<script setup>
import { ref } from 'vue'

const test = ref(false)
const test2 = ref(false)
</script>

<template>
  正常：<VaSwitch v-model="test" /> <br>
  禁用：<VaSwitch v-model="test2" disabled />
</template>
