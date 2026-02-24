<script setup>
import { ref } from 'vue'

const test = ref('')
</script>

<template>
  <div class="size-holder">
    <VaInput v-model="test" placeholder="大的 Input" size="large" />
    <VaInput v-model="test" placeholder="普通的 Input" />
    <VaInput v-model="test" placeholder="小的 Input" size="small" />
  </div>
</template>

<style>
.size-holder {
  display: flex;
  align-items: center;
}
</style>
