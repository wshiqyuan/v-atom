<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { createMessage } from 'v-atom-ui'

const openValue = ref(['a'])

const test = ref('')

const test2 = ref(false)

onMounted(() => {
  createMessage ({
    message: '测试',
    duration: 2000,
    type: 'success',
    showClose: true
  }),
  createMessage ({
    message: '测试2',
    duration: 3000
  })
  createMessage ({
    message: '测试3',
    duration: 4000
  })
  createMessage({ message: 'hello world', duration: 0, showClose: true })
  createMessage({ message: 'hello world again', duration: 0, type: 'success', showClose: true })
  createMessage({ message: h('h1', 'test'), duration: 0, type: 'danger', showClose: true })

  setTimeout(() => {
    createMessage({ message: 'hello world', duration: 0, showClose: true })
  }, 5000)

})

</script>

<template>
  <div>
    <va-button>我是 va-button</va-button>
  </div>
</template>

<style scoped></style>