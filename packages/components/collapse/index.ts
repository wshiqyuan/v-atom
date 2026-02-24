import { WithInstall } from '@v-atom/utils'
import Collapse from './src/Collapse.vue'
import CollapseItem from './src/CollapseItem.vue'

export const VaCollapse = WithInstall(Collapse)
export const VaCollapseItem = WithInstall(CollapseItem)

export default VaCollapse

export * from './src/types'
