<script setup>
import { ref } from 'vue'

const test = ref('right')
</script>

<template>
  <VaSwitch v-model="test" active-value="right" inactive-value="wrong" />
  <h4>model-value: {{ test }}</h4>
</template>
