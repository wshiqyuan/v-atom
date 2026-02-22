<script setup>
import { reactive } from 'vue'

import Button from '../../../packages/components/button/src/Button.vue'
import Form from '../../../packages/components/form/src/Form.vue'
import FormItem from '../../../packages/components/form/src/FormItem.vue'
import Input from '../../../packages/components/input/src/Input.vue'

const model = reactive({
  email: '',
  password: '',
  test: '',
})
const rules = {
  email: [
    { type: 'email', required: true, trigger: 'blur' },
    { type: 'string', required: true, trigger: 'input' },
  ],
  password: [
    { type: 'string', required: true, trigger: 'blur' },
  ],
  test: [
    { type: 'string', required: true, trigger: 'blur' },
  ],
}
</script>

<template>
  <Form :model="model" :rules="rules">
    <FormItem label="the email" prop="email">
      <Input v-model="model.email" />
    </FormItem>
    <FormItem label="the password" prop="password">
      <template #label="{ label }">
        <Button>
          {{ label }}
        </Button>
      </template>
      <Input v-model="model.password" type="password" />
    </FormItem>
    <FormItem label="test value" prop="test">
      <template #default="{ validate }">
        <input v-model="model.test" type="text" @blur="validate">
      </template>
    </FormItem>
    <div>
      <Button type="primary">
        Submit
      </Button>
      <Button>Reset</Button>
    </div>
  </Form>
  <div>
    form value:
    <pre>{{ model }}</pre>
  </div>
</template>
