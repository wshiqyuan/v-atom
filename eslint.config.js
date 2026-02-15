// @ts-check
import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'

export default antfu(
  {
    vue: true,
    typescript: true,
    rules: {
      'no-console': 'off',
      'style/quote-props': ['error', 'as-needed'],
    },
    ...oxlint.configs['flat/recommended'],
    ignores: [
      'examples/**',
    ],
  },
)
