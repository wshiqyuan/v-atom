<script setup>
import { ref } from 'vue'

const test = ref('')
</script>

<template>
  <VaInput v-model="test" placeholder="prepend append">
    <template #prepend>
      Https://
    </template>
    <template #append>
      .com
    </template>
  </VaInput>

  <VaInput v-model="test" placeholder="prefix suffix">
    <template #prefix>
      <VaIcon icon="fa-user" />
    </template>
    <template #suffix>
      <VaIcon icon="fa-user" />
    </template>
  </VaInput>
</template>
