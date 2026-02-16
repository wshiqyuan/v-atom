<script setup>
import { ref } from 'vue'
import Input from '../../../packages/components/input/src/Input.vue'

const test = ref('')
</script>

<template>
  <div class="size-holder">
    <Input v-model="test" placeholder="大的 Input" size="large" />
    <Input v-model="test" placeholder="普通的 Input" />
    <Input v-model="test" placeholder="小的 Input" size="small" />
  </div>
</template>

<style>
.size-holder {
  display: flex;
  align-items: center;
}
</style>
