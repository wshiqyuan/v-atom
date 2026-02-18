<script setup>
import { ref } from 'vue'
import Switch from '../../../packages/components/switch/src/Switch.vue'

const test = ref(false)
</script>

<template>
  <Switch v-model="test" />
</template>
