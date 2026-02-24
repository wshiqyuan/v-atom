<script lang="ts" setup>
import type { TooltipInstance } from '../../tooltip/src/types'
import type { DropdownEmits, DropdownInstance, DropdownProps, MenuOption } from './types'
import { ref } from 'vue'
import RenderVnode from '../../common/RenderVnode'
import Tooltip from '../../tooltip/src/Tooltip.vue'

defineOptions({
  name: 'VaDropdown',
})

const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref<TooltipInstance>()

function visibleChange(e: boolean) {
  emits('visibleChange', e)
}

function itemClick(e: MenuOption) {
  if (e.disabled) {
    return
  }
  emits('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide(),
})
</script>

<template>
  <div class="va-dropdown">
    <Tooltip
      ref="tooltipRef"
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
    >
      <slot />
      <template #content>
        <ul class="va-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            />
            <li
              :id="`dropdown-item-${item.key}`"
              class="va-dropdown__item"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              @click="itemClick(item)"
            >
              <RenderVnode :vnode="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
