import type { VNode } from 'vue'

export type SelectValueType = string | number

export interface SelectOption {
  label: string
  value: SelectValueType
  disabled?: boolean
}

export interface SelectProps {
  modelValue: SelectValueType
  options?: SelectOption[]
  placeholder: string
  disabled: boolean
  clearable?: boolean
  renderLabel?: RenderLabelFunc
  filterable?: boolean
  filterMethod?: CustomFilterFunc
  remote?: boolean
  remoteMethod?: CustomFilterRemoteFunc
}

export interface SelectStates {
  inputValue: string
  selectedOption: SelectOption | null
  mouseHover: boolean
  loading: boolean
  highlightIndex: number
}

export type RenderLabelFunc = (option: SelectOption) => VNode

export type CustomFilterFunc = (value: string) => SelectOption[]

export type CustomFilterRemoteFunc = (values: string) => Promise<SelectOption[]>

export interface SelectEmits {
  (e: 'change', value: SelectValueType): void
  (e: 'update:modelValue', value: SelectValueType): void
  (e: 'visibleChange', value: boolean): void
  (e: 'clear'): void
}

export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement
}
