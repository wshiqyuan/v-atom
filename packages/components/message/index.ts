import { WithInstall } from '@v-atom/utils'
import Message from './src/Message.vue'
import { closeAllMessage, createMessage } from './src/method'

export const VaMessage = WithInstall(Message)

export default VaMessage

export { closeAllMessage, createMessage }

export * from './src/types'
