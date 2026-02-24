<script setup>
import { reactive, ref } from 'vue'

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
  <VaForm ref="formRef" :model="model" :rules="rules">
    <VaFormItem label="the email" prop="email">
      <VaInput v-model="model.email" />
    </VaFormItem>
    <VaFormItem label="the password" prop="password">
      <VaInput v-model="model.password" type="password" />
    </VaFormItem>
    <VaFormItem label="confirm password" prop="confirmPwd">
      <VaInput v-model="model.confirmPwd" type="password" />
    </VaFormItem>
    <div :style="{ textAlign: 'center' }">
      <VaButton type="primary" @click.prevent="submit">
        Submit
      </VaButton>
      <VaButton @click.prevent="reset">
        Reset
      </VaButton>
    </div>
  </VaForm>
  <div>
    form value:
    <pre>{{ model }}</pre>
  </div>
</template>
