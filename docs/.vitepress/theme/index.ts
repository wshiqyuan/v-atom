import type { EnhanceAppContext } from 'vitepress'
import VAtom from 'v-atom'
import Theme from 'vitepress/theme'

import 'v-atom/dist/v-atom.css'
import './custom.css'

export default {
  ...Theme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(VAtom)
  },
}
