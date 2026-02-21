import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
import type { InjectionKey } from 'vue'

export interface FormItemProps {
  label: string
  prop?: string
}

export type FormRules = Record<string, RuleItem[]>

export interface FormProps {
  model: Record<string, any>
  rules: FormRules
}

export interface FormContext extends FormProps {}

export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
