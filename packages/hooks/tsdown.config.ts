import { createTsdownConfig } from '../../tsdown.config'

export default createTsdownConfig({
  entry: ['./index.ts', './**/index.ts'],
  external: ['vue'],
})
