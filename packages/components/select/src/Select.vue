<script lang="ts" setup>
import type { Ref } from 'vue'
import type { TooltipInstance } from '../../tooltip/src/types'
import type { InputInstance, SelectEmits, SelectOption, SelectProps, SelectStates, SelectValueType } from './types'
import { reactive, ref } from 'vue'
import Icon from '../../icon/src/Icon.vue'
import Input from '../../input/src/Input.vue'
import Tooltip from '../../tooltip/src/Tooltip.vue'

defineOptions({
  name: 'VaSelect',
})

const props = defineProps<SelectProps>()

const emits = defineEmits<SelectEmits>()

const tooltipRef = ref() as Ref<TooltipInstance>

const inputRef = ref() as Ref<InputInstance>

const initialOption = findOption(props.modelValue)

const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
})

const isDropdownShow = ref(false)

const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles'],
    },
  ],
}

function controlDropdown(show: boolean) {
  if (show) {
    tooltipRef.value.show()
  }
  else {
    tooltipRef.value.hide()
  }
  isDropdownShow.value = show
  emits('visibleChange', show)
}

function toggleDropdown() {
  if (props.disabled)
    return
  if (isDropdownShow.value) {
    controlDropdown(false)
  }
  else {
    controlDropdown(true)
  }
}

function findOption(value: SelectValueType) {
  const option = props.options.find(option => option.value === value)
  return option || null
}

function itemSelect(e: SelectOption) {
  if (e.disabled)
    return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  controlDropdown(false)
  inputRef.value.ref.focus()
}
</script>

<template>
  <div
    class="va-select"
    :class="{
      'is-disabled': disabled,
    }"
    @click="toggleDropdown"
  >
    <Tooltip
      ref="tooltipRef"
      placement="bottom-start"
      :popper-options="popperOptions"
      manual
      @click-outside="controlDropdown(false)"
    >
      <Input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
        readonly
      >
        <template #suffix>
          <Icon
            icon="angle-down"
            class="header-angle"
            :class="{
              'is-active': isDropdownShow,
            }"
          />
        </template>
      </Input>
      <template #content>
        <ul class="va-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li
              :id="`select-item-${item.value}`"
              class="va-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
              }"
              @click.stop="itemSelect(item)"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
