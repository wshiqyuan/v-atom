<script setup>
import { ref } from 'vue'

const test = ref(false)
</script>

<template>
  <VaSwitch v-model="test" />
</template>
