import { WithInstall } from '@v-atom/utils'
import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'

export const VaForm = WithInstall(Form)
export const VaFormItem = WithInstall(FormItem)

export default VaForm

export * from './src/types'
