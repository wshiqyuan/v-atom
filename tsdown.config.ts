import type { UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export function createTsdownConfig(options: {
  entry: UserConfig['entry']
  external?: (string | RegExp)[]
}) {
  return defineConfig({
    entry: options.entry,
    format: ['esm'],
    platform: 'neutral',
    plugins: [Vue({ isProduction: true })],
    dts: { vue: true },
    clean: true,
    external: [
      'vue',
      ...(options.external || []),
    ],
  })
}
