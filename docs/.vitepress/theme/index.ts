import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import Theme from 'vitepress/theme'

import '../../../packages/theme/index.css'
import './custom.css'

library.add(fas)

export default Theme
