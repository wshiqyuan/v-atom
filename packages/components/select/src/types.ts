export type SelectValueType = string | number

export interface SelectOption {
  label: string
  value: SelectValueType
  disabled?: boolean
}

export interface SelectProps {
  modelValue: SelectValueType
  options: SelectOption[]
  placeholder: string
  disabled: boolean
}

export interface SelectStates {
  inputValue: string
  selectedOption: SelectOption | null
}

export interface SelectEmits {
  (e: 'change', value: SelectValueType): void
  (e: 'update:modelValue', value: SelectValueType): void
  (e: 'visibleChange', value: boolean): void
}

export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement
}
