<script setup>
import { ref } from 'vue'

const test = ref('')
</script>

<template>
  <VaInput v-model="test" placeholder="可以是一个 Textarea" type="textarea" />
</template>
