<script setup>
import { reactive, ref } from 'vue'

import Button from '../../../packages/components/button/src/Button.vue'
import Form from '../../../packages/components/form/src/Form.vue'
import FormItem from '../../../packages/components/form/src/FormItem.vue'
import Input from '../../../packages/components/input/src/Input.vue'

const formRef = ref()

const model = reactive({
  email: '123',
  password: '',
  confirmPwd: '',
})
const rules = {
  email: [
    { type: 'email', required: true, trigger: 'blur' },
    { type: 'string', required: true, trigger: 'input' },
  ],
  password: [
    { type: 'string', required: true, trigger: 'blur' },
  ],
  confirmPwd: [
    { type: 'string', required: true, trigger: 'blur' },
    { validator: (rule, value) => value === model.password, trigger: 'blur', message: '密码不一致' },
  ],
}

async function submit() {
  try {
    await formRef.value.validate()
    console.log('passed')
  }
  catch (e) {
    console.log(e)
  }
}

function reset() {
  formRef.value.clearValidate()
  formRef.value.resetFields()
}
</script>

<template>
  <Form ref="formRef" :model="model" :rules="rules">
    <FormItem label="the email" prop="email">
      <Input v-model="model.email" />
    </FormItem>
    <FormItem label="the password" prop="password">
      <Input v-model="model.password" type="password" />
    </FormItem>
    <FormItem label="confirm password" prop="confirmPwd">
      <Input v-model="model.confirmPwd" type="password" />
    </FormItem>
    <div :style="{ textAlign: 'center' }">
      <Button type="primary" @click.prevent="submit">
        Submit
      </Button>
      <Button @click.prevent="reset">
        Reset
      </Button>
    </div>
  </Form>
  <div>
    form value:
    <pre>{{ model }}</pre>
  </div>
</template>
