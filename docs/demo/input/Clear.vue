<script setup>
import { ref } from 'vue'

const test = ref('')
</script>

<template>
  <VaInput v-model="test" clearable placeholder="输入字符以后可以点击清空" />
</template>
