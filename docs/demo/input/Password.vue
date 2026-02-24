<script setup>
import { ref } from 'vue'

const test = ref('')
</script>

<template>
  <VaInput v-model="test" placeholder="密码文本框，可以切换" show-password />
</template>
