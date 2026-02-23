import type { Plugin } from 'vue'
import { VaSwitch } from '@v-atom/components'
import { VaAlert } from '@v-atom/components/alert'
import { VaButton } from '@v-atom/components/button'
import { VaCollapse, VaCollapseItem } from '@v-atom/components/collapse'
import { VaDropdown } from '@v-atom/components/dropdown'
import { VaForm, VaFormItem } from '@v-atom/components/form'
import { VaIcon } from '@v-atom/components/icon'
import { VaInput } from '@v-atom/components/input'
import { VaMessage } from '@v-atom/components/message'
import { VaSelect } from '@v-atom/components/select'
import { VaTooltip } from '@v-atom/components/tooltip'

export const components = [
  VaAlert,
  VaButton,
  VaCollapse,
  VaCollapseItem,
  VaDropdown,
  VaForm,
  VaFormItem,
  VaIcon,
  VaMessage,
  VaInput,
  VaSelect,
  VaSwitch,
  VaTooltip,
] as Plugin[]
