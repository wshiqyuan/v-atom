import type { App } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'

import DefaultTheme from 'vitepress/theme'
import '@vitepress-demo-preview/component/dist/style.css'

import '../../../packages/theme/index.css'
import './custom.css'

library.add(fas)

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', ElementPlusContainer)
  },
}
